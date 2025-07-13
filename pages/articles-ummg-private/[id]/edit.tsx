import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Editor } from 'primereact/editor';

export default function EditArticle({ article, notFound }: any) {
  const [name, setName] = useState(article?.name || '');
  const [description, setDescription] = useState(article?.description || '');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  if (notFound) return <div className="max-w-xl mx-auto py-8">Article not found.</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      const res = await fetch(`/api/articles/${article.id}`, {
        method: 'PUT',
        body: formData,
      });
      console.log(res);
      if (!res.ok) {
        const data = await res.json();
        console.log('I am not ok to upload');
        setError(data.error || 'Failed to update article');
      } else {
        console.log('uploaded successfully')
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
          <Editor value={description} onTextChange={(e) => setDescription(e.htmlValue || '')} style={{ height: '320px' }} />
        </div>
        <div>
          <label className="block font-medium">Image</label>
          <input type="file" onChange={e => setImage(e.target.files ? e.target.files[0] : null)} className="w-full border px-3 py-2 rounded" />
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
          {loading ? 'Updating...' : 'Update Article'}
        </button>
      </form>
      <Link href={`/articles-ummg-private/${article.id}`} className="text-gray-600 hover:underline mt-4 inline-block">Back to article</Link>
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