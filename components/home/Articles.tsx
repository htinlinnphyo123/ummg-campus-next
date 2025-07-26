import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Title from "./title";

interface Article {
  id: number;
  name: string;
  content: string;
  image: string;
  createdAt: string;
}

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("/api/articles?count=6");
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="news" className="mx-auto px-4">
      <div className="flex justify-between">
        <Title name="News" />
        <Link
          href="/news"
          className="px-6 py-3 text-blue-600"
        >
          See All Articles
        </Link>
      </div>
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
  );
}
