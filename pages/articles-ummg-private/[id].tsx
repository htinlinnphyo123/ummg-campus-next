import { GetServerSideProps } from 'next';
import Link from 'next/link';

export default function ArticleView({ article, notFound }: any) {
  if (notFound) return <div className="max-w-xl mx-auto py-8">Article not found.</div>;
  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">{article.name}</h1>
      <img src={article.image} alt={article.name} className="w-full h-64 object-cover rounded mb-4" />
      <p className="mb-4">{article.description}</p>
      <div className="flex gap-4">
        <Link href={`/articles-ummg-private/${article.id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
        <Link href="/articles-ummg-private" className="text-gray-600 hover:underline">Back to list</Link>
      </div>
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