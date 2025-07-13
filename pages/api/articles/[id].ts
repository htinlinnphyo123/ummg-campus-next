import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import formidable, { File } from 'formidable';
import path from 'path';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid id' });
  }

  if (req.method === 'GET') {
    try {
      const article = await prisma.article.findUnique({ where: { id: Number(id) } });
      if (!article) return res.status(404).json({ error: 'Article not found' });
      article.image = `${process.env.APP_URL}/${article.image}`
      return res.status(200).json(article);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch article' });
    }
  }

  if (req.method === 'PUT') { 
    const form = formidable({});

    try {
      // Use Promise wrapper for form.parse
      const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve([fields, files]);
        });
      });

      const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
      const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
      let imagePath: string | undefined;

      if (files.image) {
        const uploadedImage = Array.isArray(files.image) ? files.image[0] : files.image;
        const oldPath = uploadedImage.filepath;
        const newFileName = `${Date.now()}-${uploadedImage.originalFilename}`;
        const newPath = path.join(process.cwd(), 'public/uploads', newFileName);

        try {
          await fs.copyFile(oldPath, newPath);
          imagePath = 'uploads/' + newFileName;
        } catch (error) {
          return res.status(500).json({ error: 'Failed to save image' });
        }
      }

      const dataToUpdate: { name?: string; description?: string; image?: string } = {};
      if (name) dataToUpdate.name = name;
      if (description) dataToUpdate.description = description;
      if (imagePath) dataToUpdate.image = imagePath;

      const article = await prisma.article.update({
        where: { id: Number(id) },
        data: dataToUpdate,
      });
      console.log(article);
      return res.status(200).json(article);
    } catch (error) {
      console.error('PUT error:', error);
      return res.status(500).json({ error: 'Failed to update article' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.article.delete({ where: { id: Number(id) } });
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete article' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}