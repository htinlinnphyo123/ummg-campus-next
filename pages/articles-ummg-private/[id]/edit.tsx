import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function EditArticle({ article, notFound }: any) {
  const [name, setName] = useState(article?.name || '');
  const [description, setDescription] = useState(article?.description || '');
  const [image, setImage] = useState(article?.image || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  if (notFound) return <div className="max-w-xl mx-auto py-8">Article not found.</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/articles/${article.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, image }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to update article');
      } else {
        router.push(`/articles-ummg-private/${article.id}`);
      }
    } catch (err) {
      setError('Failed to update article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input value={name} onChange={e => setName(e.target.value)} required className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} required className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block font-medium">Image URL</label>
          <input value={image} onChange={e => setImage(e.target.value)} required className="w-full border px-3 py-2 rounded" />
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
          {loading ? 'Updating...' : 'Update Article'}
        </button>
      </form>
      <Link href={`/articles/${article.id}`} className="text-gray-600 hover:underline mt-4 inline-block">Back to article</Link>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/articles/${id}`);
  if (!res.ok) {
    return { props: { notFound: true } };
  }
  const article = await res.json();
  return { props: { article } };
}; 