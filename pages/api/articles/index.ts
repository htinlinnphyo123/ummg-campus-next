// pages/api/articles/index.ts (assuming this is your file)

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma'; // Ensure this points to your MongoDB-configured PrismaClient
import formidable from 'formidable';
// import path from 'path'; // No longer needed for local paths
import fs from 'fs/promises'; // Use fs/promises to read file for Cloudinary upload

// Cloudinary setup
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with your environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Use HTTPS
});

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

      return res.status(200).json(articles); // Return articles directly
    } catch (error) {
      console.error('Error fetching articles:', error); // Log the actual error
      return res.status(500).json({ error: 'Failed to fetch articles' });
    }
  }

  if (req.method === 'POST') {
    const form = formidable({
      maxFileSize: 5 * 1024 * 1024, // 5 MB
    });

    try {
      const [fields, files] = await new Promise<[ArticleFields, ArticleFiles]>((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) {
            console.error('Formidable parse error:', err);
            return reject(err);
          }
          resolve([fields as ArticleFields, files as ArticleFiles]);
        });
      });

      const name = fields.name?.[0];
      const description = fields.description?.[0];
      const uploadedImage = files.image?.[0];

      if (!name || !description || !uploadedImage) {
        if (uploadedImage && uploadedImage.filepath) {
          await fs.unlink(uploadedImage.filepath);
        }
        return res.status(400).json({ error: 'Missing required fields (name, description, or image)' });
      }

      let imageUrl: string = '';

      // Check if the uploaded file is valid
      if (uploadedImage.filepath && uploadedImage.mimetype) {
        try {
          // Read the temporary file into a buffer
          const imageBuffer = await fs.readFile(uploadedImage.filepath);

          const result = await cloudinary.uploader.upload_stream(
            { resource_type: 'image', folder: 'articles' }, // Specify folder in Cloudinary
            async (error, result) => {
              if (error) {
                console.error('Cloudinary upload error:', error);
                // Clean up formidable temp file if upload fails
                await fs.unlink(uploadedImage.filepath);
                throw new Error('Failed to upload image to Cloudinary');
              }
              if (result) {
                imageUrl = result.secure_url; // This is the public URL
                // The Promise will resolve later, so handle it carefully
              }
            }
          ).end(imageBuffer); // End the stream with the image buffer

          // Wait for the stream to finish and result to be available
          // This requires a bit of refactoring for async/await with upload_stream,
          // A more direct way is to use `upload` with the file path directly.
          // Let's use `upload` for simplicity with formidable's temp file.

          // Option 2: Use cloudinary.uploader.upload with the temporary file path
          const uploadResult = await cloudinary.uploader.upload(uploadedImage.filepath, {
            folder: 'articles', // Optional: organize uploads into a folder
            resource_type: 'image', // Ensures it's treated as an image
          });
          imageUrl = uploadResult.secure_url;

          // Clean up the temporary file created by formidable AFTER successful upload
          await fs.unlink(uploadedImage.filepath);

        } catch (uploadError) {
          console.error('Image upload process error:', uploadError);
          // Ensure temp file is cleaned up on any error during upload
          if (uploadedImage.filepath) {
            await fs.unlink(uploadedImage.filepath);
          }
          return res.status(500).json({ error: 'Failed to upload image to Cloudinary.' });
        }
      } else {
        // If uploadedImage is missing filepath or mimetype
        return res.status(400).json({ error: 'Invalid image file provided.' });
      }

      const article = await prisma.article.create({
        data: {
          name: name,
          description: description,
          image: imageUrl, // Store the Cloudinary URL
        },
      });
      return res.status(201).json(article);
    } catch (error) {
      console.error('Error creating article:', error);
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