import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/articles');
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      setError('Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      setArticles((prev) => prev.filter((a: any) => a.id !== id));
    } catch (err) {
      alert('Failed to delete article');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Articles</h1>
      <Link href="/articles-ummg-private/new" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">Create New Article</Link>
      <ul className="divide-y divide-gray-200 mt-4">
        {articles.length === 0 && <li>No articles found.</li>}
        {articles.map((article: any) => (
          <li key={article.id} className="py-4 flex justify-between items-center">
            <div>
              <Link href={`/articles-ummg-private/${article.id}`} className="text-lg font-semibold hover:underline">{article.name}</Link>
              <div className="text-sm text-gray-500">{article.description.slice(0, 60)}...</div>
              <img src={article.image} alt={article.name} className="w-40 h-20 object-cover mt-2" />
            </div>
            <div className="flex gap-2">
              <Link href={`/articles-ummg-private/${article.id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
              <button onClick={() => handleDelete(article.id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 