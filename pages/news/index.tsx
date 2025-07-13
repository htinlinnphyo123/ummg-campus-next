import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../../components/Header'
interface Article {
    id:number,
    name:string,
    description:string,
    image:string,
    createdAt:Date
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

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <>
    <Header />
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold mb-8">Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div 
            key={article.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {article.image && (
              <img 
                src={article.image} 
                alt={article.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{article.name}</h2>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {new Date(article.createdAt).toLocaleDateString()}
                </span>
                <button className="text-blue-600 hover:text-blue-800">
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default ArticlesPage
