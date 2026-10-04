import Link from "next/link";
import NewsFeed from "../common/NewsFeed";

export default function Articles() {
  return (
    <section id="news" className="news-section page-width">
      <div className="section-heading-row">
        <div><p className="eyebrow">University updates</p><h2 className="section-title">News & notices</h2></div>
        <Link href="/news" className="text-link">All notices <span aria-hidden="true">→</span></Link>
      </div>
      <NewsFeed limit={4} />
    </section>
  );
}
