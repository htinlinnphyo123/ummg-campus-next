import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import formidable from 'formidable';
import path from 'path';
export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const articles = await prisma.article.findMany(
        {
          orderBy: { createdAt: 'desc' },
          ...(req.query.count ? { take: Number(req.query.count) } : {}),
        }
      );
      const articlesWithFullImageUrl = articles.map(article => ({
        ...article,
        image: `${process.env.APP_URL}/${article.image}`
      }));
      return res.status(200).json(articlesWithFullImageUrl);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch articles' });
    }
  }

  if (req.method === 'POST') {
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'public/uploads'),
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024,
    });

    try {
      const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          resolve([fields, files]);
        });
      });

      const { name, description } = fields;
      // Handle files.image being an array or single file
      const uploadedImage = Array.isArray(files.image) ? files.image[0] : files.image;
      if (!name || !description || !uploadedImage) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Get the relative path of the uploaded file
      const filePath = uploadedImage.filepath;
      if (!filePath) {
        return res.status(400).json({ error: 'Uploaded file path is missing' });
      }
      const relativePath = path.relative(
        path.join(process.cwd(), 'public/uploads'),
        filePath
      );
      const article = await prisma.article.create({
        data: {
          name: name.toString(),
          description: description.toString(),
          image: "uploads/" + path.basename(relativePath), // Store the relative path in the database
        },
      });
      return res.status(201).json(article);
    } catch (error) {
      console.error('Error creating article:', error);
      return res.status(500).json({ error: 'Failed to create article' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}