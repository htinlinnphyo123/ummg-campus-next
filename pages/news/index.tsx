import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../../components/Header'
import Link from 'next/link'
interface Article {
    id: number;
    name: string;
    description: string;
    image: string;
    createdAt: Date;
}

const ArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('/api/articles')
        setArticles(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch articles')
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold mb-8">Latest News</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              href={`/news/${article.id}`}
              key={article.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {article.image && (
                <img 
                  src={article.image} 
                  alt={article.name}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 line-clamp-2">{article.name}</h2>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </span>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
                    Read More
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default ArticlesPage
