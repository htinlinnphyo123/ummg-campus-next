import { useState } from 'react';
import { useRouter } from 'next/router';
import {Editor} from 'primereact/editor'

export default function NewArticle() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('image', imageFile);
      console.log(Object.fromEntries(formData));
      const res = await fetch('/api/articles', {
        method: 'POST',
        body: formData,
      });
      console.log(res);
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to create article');
      } else {
        router.push('/articles-ummg-private');
      }
    } catch (err) {
      setError('Failed to create article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Create New Article</h1>
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
          <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} required className="w-full border px-3 py-2 rounded" />
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
          {loading ? 'Creating...' : 'Create Article'}
        </button>
      </form>
    </div>
  );
}