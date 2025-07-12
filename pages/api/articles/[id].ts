import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid id' });
  }

  if (req.method === 'GET') {
    // Get single article
    try {
      const article = await prisma.article.findUnique({ where: { id: Number(id) } });
      if (!article) return res.status(404).json({ error: 'Article not found' });
      return res.status(200).json(article);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch article' });
    }
  }

  if (req.method === 'PUT') {
    // Update article
    const { name, description, image } = req.body;
    try {
      const article = await prisma.article.update({
        where: { id: Number(id) },
        data: { name, description, image },
      });
      return res.status(200).json(article);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update article' });
    }
  }

  if (req.method === 'DELETE') {
    // Delete article
    try {
      await prisma.article.delete({ where: { id: Number(id) } });
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete article' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
} 