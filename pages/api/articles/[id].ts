// pages/api/articles/[id].ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma'; // Ensure this points to your MongoDB-configured PrismaClient
import formidable from 'formidable';
// No longer need 'path' for local file paths
import fs from 'fs/promises'; // Still needed to read formidable's temporary file

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
  const { id } = req.query; // `id` will be a string from the URL (MongoDB ObjectId)
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing article ID' });
  }

  // No longer need to manage a local upload directory here
  // const uploadDir = path.join(process.cwd(), 'public/uploads');
  // try {
  //   await fs.mkdir(uploadDir, { recursive: true });
  // } catch (error) {
  //   console.error('Failed to create upload directory:', error);
  //   return res.status(500).json({ error: 'Server configuration error: Could not ensure upload directory exists.' });
  // }


  if (req.method === 'GET') {
    try {
      // Find article by its string ID (MongoDB ObjectId)
      const article = await prisma.article.findUnique({ where: { id: id } });
      if (!article) return res.status(404).json({ error: 'Article not found' });

      // With Cloudinary, the 'image' field in DB will already store the full public URL.
      // So, no need to prepend APP_URL or do any transformation here.
      // The `article.image` will directly be the URL from Cloudinary.
      return res.status(200).json(article);
    } catch (error) {
      console.error('Error fetching article:', error);
      return res.status(500).json({ error: 'Failed to fetch article' });
    }
  }

  if (req.method === 'PUT') {
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
      let newImageUrl: string | undefined;

      const dataToUpdate: { name?: string; description?: string; image?: string } = {};

      if (name) dataToUpdate.name = name;
      if (description) dataToUpdate.description = description;

      // Handle image upload for update
      if (files.image) {
        const uploadedImage = files.image[0];

        // 1. Fetch the existing article to get the old image URL
        const existingArticle = await prisma.article.findUnique({
          where: { id: id },
          select: { image: true }
        });

        // 2. Upload the new image to Cloudinary
        if (uploadedImage.filepath && uploadedImage.mimetype) {
          try {
            const uploadResult = await cloudinary.uploader.upload(uploadedImage.filepath, {
              folder: 'articles', // Same folder as create
              resource_type: 'image',
            });
            newImageUrl = uploadResult.secure_url;

            // 3. Clean up the temporary file created by formidable
            await fs.unlink(uploadedImage.filepath);

            // 4. Delete the old image from Cloudinary (if it exists and is a valid Cloudinary URL)
            if (existingArticle && existingArticle.image) {
              // Extract public_id from the Cloudinary URL
              const publicIdMatch = existingArticle.image.match(/\/v\d+\/(articles\/[^/.]+)\./);
              if (publicIdMatch && publicIdMatch[1]) {
                const publicId = publicIdMatch[1]; // e.g., 'articles/some_random_id_with_original_name'
                try {
                  await cloudinary.uploader.destroy(publicId);
                  console.log(`Old Cloudinary image deleted: ${existingArticle.image}`);
                } catch (deleteError) {
                  console.warn(`Failed to delete old Cloudinary image ${existingArticle.image}:`, deleteError);
                }
              } else {
                console.warn(`Could not extract public_id from old image URL: ${existingArticle.image}`);
              }
            }
            dataToUpdate.image = newImageUrl; // Set the new image URL for update
          } catch (uploadError) {
            console.error('Image upload/deletion process error during PUT:', uploadError);
            // Ensure temp file is cleaned up on any error during upload
            if (uploadedImage.filepath) {
              await fs.unlink(uploadedImage.filepath);
            }
            return res.status(500).json({ error: 'Failed to upload/update image on Cloudinary.' });
          }
        } else {
          return res.status(400).json({ error: 'Invalid image file provided for update.' });
        }
      }

      // If no name, description, or new image, return early
      if (Object.keys(dataToUpdate).length === 0) {
        return res.status(400).json({ error: 'No data provided for update.' });
      }

      const updatedArticle = await prisma.article.update({
        where: { id: id }, // Update by string ID
        data: dataToUpdate,
      });

      return res.status(200).json(updatedArticle);
    } catch (error) {
      console.error('PUT error:', error);
      let errorMessage = 'Failed to update article';
      if (error instanceof Error) {
        if (error.message.includes('maximum file size exceeded')) {
          errorMessage = 'File size exceeds limit (5MB).';
        }
      }
      return res.status(500).json({ error: errorMessage });
    }
  }

  if (req.method === 'DELETE') {
    try {
      // 1. Find the article to get its image URL for deletion from Cloudinary
      const articleToDelete = await prisma.article.findUnique({
        where: { id: id },
        select: { image: true }
      });

      // 2. Delete the article record from MongoDB
      await prisma.article.delete({ where: { id: id } });

      // 3. If an image exists, delete it from Cloudinary storage
      if (articleToDelete && articleToDelete.image) {
        // Extract public_id from the Cloudinary URL
        const publicIdMatch = articleToDelete.image.match(/\/v\d+\/(articles\/[^/.]+)\./);
        if (publicIdMatch && publicIdMatch[1]) {
          const publicId = publicIdMatch[1];
          try {
            await cloudinary.uploader.destroy(publicId);
            console.log(`Image deleted from Cloudinary for article ${id}: ${articleToDelete.image}`);
          } catch (deleteError) {
            console.warn(`Could not delete Cloudinary image for article ${id}:`, deleteError);
            // Log the error but don't prevent the 204 response as the DB record is gone
          }
        } else {
          console.warn(`Could not extract public_id from image URL for article ${id}: ${articleToDelete.image}`);
        }
      }

      return res.status(204).end(); // No content for successful DELETE
    } catch (error) {
      console.error('DELETE error:', error);
      // Check for P2025 error (record not found) if Prisma throws specific codes
      if (error instanceof Error && (error as any).code === 'P2025') {
        return res.status(404).json({ error: 'Article not found for deletion.' });
      }
      return res.status(500).json({ error: 'Failed to delete article' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}