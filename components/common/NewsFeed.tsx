import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

interface Article { id: string; name: string; image: string; createdAt: string; }

export default function NewsFeed({ limit }: { limit?: number }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    axios.get<Article[]>(limit ? `/api/articles?count=${limit}` : "/api/articles", { signal: controller.signal })
      .then(({ data }) => { if (!Array.isArray(data)) throw new Error("Invalid articles response"); setArticles(data); setStatus("ready"); })
      .catch(() => { if (!controller.signal.aborted) setStatus("error"); });
    return () => controller.abort();
  }, [limit, attempt]);

  if (status === "loading") return <div className="news-state" role="status"><p>Loading university notices…</p></div>;
  if (status === "error") return <div className="news-state" role="status"><h3>We couldn’t load the latest news.</h3><p>Please try again in a moment. You can also find university updates on our Facebook page.</p><button className="neo-button button-small" onClick={() => setAttempt((value) => value + 1)}>Try again ↻</button><div><a href="https://www.facebook.com/iucummg/" className="text-link" target="_blank" rel="noopener noreferrer">UMMG on Facebook ↗</a></div></div>;
  if (!articles.length) return <div className="news-state"><h3>No notices to display.</h3><p>University news and community updates will appear here. Check back soon.</p><a href="https://www.facebook.com/iucummg/" className="text-link" target="_blank" rel="noopener noreferrer">Follow our community ↗</a></div>;

  return <div className="news-grid">{articles.map((article) => (
    <Link href={`/news/${article.id}`} key={article.id} className="news-card">
      {article.image && <img src={article.image} alt="" loading="lazy" />}
      <div className="news-card-copy"><h3>{article.name}</h3><div className="news-card-meta"><time dateTime={article.createdAt}>{new Date(article.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</time><span>Read notice →</span></div></div>
    </Link>
  ))}</div>;
}
