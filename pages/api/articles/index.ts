import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import formidable from 'formidable';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const articles = await prisma.article.findMany({ orderBy: { createdAt: 'desc' } });
      return res.status(200).json(articles);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch articles' });
    }
  }

  if (req.method === 'POST') {
    const { name, description, image } = req.body;
    if (!name || !description || !image) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
      const article = await prisma.article.create({
        data: { name, description, image },
      });
      return res.status(201).json(article);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create article' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
} 