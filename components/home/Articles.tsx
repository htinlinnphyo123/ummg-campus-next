import Link from "next/link";
import NewsFeed from "../common/NewsFeed";

export default function Articles() {
  return (
    <section id="news" className="news-section page-width">
      <p className="eyebrow">05 / THE LATEST FROM UMMG</p>
      <div className="section-heading-row"><h2 className="section-title">Campus & community.</h2><Link href="/news" className="neo-button button-small">All news <span aria-hidden="true">↗</span></Link></div>
      <NewsFeed limit={6} />
    </section>
  );
}
