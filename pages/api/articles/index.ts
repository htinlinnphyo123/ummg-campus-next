import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma'; // Ensure this points to your MongoDB-configured PrismaClient
import formidable from 'formidable';
import path from 'path';
import fs from 'fs'; // Import fs for directory creation

// Define the shape of your form fields
interface ArticleFields extends formidable.Fields {
  name?: string[];
  description?: string[];
}

// Define the shape of your form files
interface ArticleFiles extends formidable.Files {
  image?: formidable.File[];
}

export const config = {
  api: {
    bodyParser: false, // Essential for formidable to parse the multipart/form-data
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const articles = await prisma.article.findMany({
        orderBy: { createdAt: 'desc' },
        ...(req.query.count ? { take: Number(req.query.count) } : {}),
      });

      // Ensure APP_URL is defined for image URLs
      if (!process.env.APP_URL) {
        console.warn("APP_URL environment variable is not set. Image URLs may be incomplete.");
        // Depending on your deployment, you might want to return an error or default
        // For development, it might default to http://localhost:3000
      }

      const articlesWithFullImageUrl = articles.map(article => ({
        ...article,
        // The image path stored in DB is "uploads/filename.ext"
        // We prepend APP_URL to make it a full URL
        image: `${process.env.APP_URL || ''}/${article.image}`
      }));
      return res.status(200).json(articlesWithFullImageUrl);
    } catch (error) {
      console.error('Error fetching articles:', error); // Log the actual error
      return res.status(500).json({ error: 'Failed to fetch articles' });
    }
  }

  if (req.method === 'POST') {
    const uploadDir = path.join(process.cwd(), 'public/uploads');

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({
      uploadDir: uploadDir, // Use the variable
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5 MB
      // You can also add more options, e.g., filter for image types
      // filter: ({ mimetype }) => mimetype && mimetype.includes('image'),
    });

    try {
      const [fields, files] = await new Promise<[ArticleFields, ArticleFiles]>((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) {
            console.error('Formidable parse error:', err);
            return reject(err);
          }
          resolve([fields as ArticleFields, files as ArticleFiles]); // Type assertion
        });
      });

      // Formidable returns fields as arrays of strings, so access the first element
      const name = fields.name?.[0];
      const description = fields.description?.[0];
      const uploadedImage = files.image?.[0]; // Access the first file in the array

      if (!name || !description || !uploadedImage) {
        // Clean up partially uploaded files if fields are missing
        if (uploadedImage && uploadedImage.filepath && fs.existsSync(uploadedImage.filepath)) {
          fs.unlinkSync(uploadedImage.filepath);
        }
        return res.status(400).json({ error: 'Missing required fields (name, description, or image)' });
      }

      const filePath = uploadedImage.filepath;
      if (!filePath) {
        // This case should ideally not happen if uploadedImage exists, but for safety
        return res.status(400).json({ error: 'Uploaded file path is missing' });
      }

      // We need to store just the path relative to the public directory for serving
      // formidable saves files with a unique name in the uploadDir.
      // We just need the basename (filename with extension)
      const fileName = path.basename(filePath);
      const relativeDbPath = "uploads/" + fileName; // Path to store in DB for serving

      const article = await prisma.article.create({
        data: {
          name: name,
          description: description,
          image: relativeDbPath, // Store "uploads/your-filename.ext"
        },
      });
      return res.status(201).json(article);
    } catch (error) {
      console.error('Error creating article:', error);
      // More specific error handling could be added for formidable errors vs. Prisma errors
      let errorMessage = 'Failed to create article';
      if (error instanceof Error) {
        if (error.message.includes('maximum file size exceeded')) {
          errorMessage = 'File size exceeds limit (5MB).';
        }
      }
      return res.status(500).json({ error: errorMessage });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}