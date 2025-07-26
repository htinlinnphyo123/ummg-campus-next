import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma'; // Ensure this points to your MongoDB-configured PrismaClient
import formidable, { File } from 'formidable';
import path from 'path';
import fs from 'fs/promises'; // Use fs/promises for async operations

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
  const { id } = req.query; // `id` will be a string from the URL
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing article ID' });
  }

  // Define the upload directory
  const uploadDir = path.join(process.cwd(), 'public/uploads');
  // Ensure the upload directory exists
  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (error) {
    console.error('Failed to create upload directory:', error);
    return res.status(500).json({ error: 'Server configuration error: Could not ensure upload directory exists.' });
  }


  if (req.method === 'GET') {
    try {
      // **CHANGE 1: Remove Number() for id**
      const article = await prisma.article.findUnique({ where: { id: id } });
      if (!article) return res.status(404).json({ error: 'Article not found' });

      // Construct full image URL if image exists
      if (article.image && process.env.APP_URL) {
        article.image = `${process.env.APP_URL}/${article.image}`;
      } else if (article.image) {
        console.warn("APP_URL environment variable is not set. Image URLs may be incomplete for GET request.");
        // Depending on your deployment, you might want to return a default or just the relative path
      }
      
      return res.status(200).json(article);
    } catch (error) {
      console.error('Error fetching article:', error); // Log the actual error
      return res.status(500).json({ error: 'Failed to fetch article' });
    }
  }

  if (req.method === 'PUT') {
    const form = formidable({
      uploadDir: uploadDir, // Use the variable
      keepExtensions: true,
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

      const name = fields.name?.[0]; // Access the first element of the array
      const description = fields.description?.[0]; // Access the first element of the array
      let imagePath: string | undefined; // To store the new image path

      const dataToUpdate: { name?: string; description?: string; image?: string } = {};

      if (name) dataToUpdate.name = name;
      if (description) dataToUpdate.description = description;

      // Handle image upload
      if (files.image) {
        const uploadedImage = files.image[0]; // Get the first file if multiple
        const newFileName = `${Date.now()}-${uploadedImage.originalFilename}`;
        const newImagePath = path.join(uploadDir, newFileName);

        // **Improvement: Atomically move the file and delete old one**
        await fs.rename(uploadedImage.filepath, newImagePath); // Move the temp file to desired location
        imagePath = 'uploads/' + newFileName; // Relative path for DB

        // If a new image is uploaded, we should clean up the old one
        // First, fetch the existing article to get the old image path
        // **CHANGE 2: Fetch article with string ID**
        const existingArticle = await prisma.article.findUnique({
          where: { id: id },
          select: { image: true } // Only select the image field
        });

        if (existingArticle && existingArticle.image) {
          const oldImageRelativePath = existingArticle.image;
          const oldImageFullPath = path.join(process.cwd(), 'public', oldImageRelativePath);
          try {
            // Check if the old image file exists before trying to delete
            await fs.access(oldImageFullPath);
            await fs.unlink(oldImageFullPath);
            console.log(`Old image deleted: ${oldImageFullPath}`);
          } catch (deleteError: any) {
            // If the file doesn't exist, fs.access will throw, which is fine
            if (deleteError.code === 'ENOENT') {
              console.warn(`Old image not found at ${oldImageFullPath}, skipping deletion.`);
            } else {
              console.error(`Failed to delete old image ${oldImageFullPath}:`, deleteError);
            }
          }
        }
        dataToUpdate.image = imagePath; // Set the new image path for update
      }

      // If no name, description, or new image, maybe return early?
      if (Object.keys(dataToUpdate).length === 0) {
        return res.status(400).json({ error: 'No data provided for update.' });
      }

      // **CHANGE 3: Update with string ID**
      const updatedArticle = await prisma.article.update({
        where: { id: id },
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
      // First, find the article to get its image path for deletion
      // **CHANGE 4: Find article with string ID before delete**
      const articleToDelete = await prisma.article.findUnique({
        where: { id: id },
        select: { image: true }
      });

      // **CHANGE 5: Delete with string ID**
      await prisma.article.delete({ where: { id: id } });

      // If an article and its image path exist, attempt to delete the image file
      if (articleToDelete && articleToDelete.image) {
        const imageFullPath = path.join(process.cwd(), 'public', articleToDelete.image);
        try {
          await fs.access(imageFullPath); // Check if file exists
          await fs.unlink(imageFullPath); // Delete the file
          console.log(`Image deleted for article ${id}: ${imageFullPath}`);
        } catch (fileDeleteError: any) {
          if (fileDeleteError.code === 'ENOENT') {
            console.warn(`Image file not found for article ${id} at ${imageFullPath}, skipping deletion.`);
          } else {
            console.error(`Error deleting image file for article ${id} at ${imageFullPath}:`, fileDeleteError);
            // Decide if you want to send a 500 here or just log and continue
            // For now, we proceed with 204 as the DB record is deleted
          }
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