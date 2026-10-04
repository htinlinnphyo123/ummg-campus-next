import Header from "../../components/Header";
import Footer from "../../components/common/footer";
import NewsFeed from "../../components/common/NewsFeed";

export default function ArticlesPage() {
  return <><Header /><main id="main-content" className="news-page page-width"><p className="eyebrow">NEWS / CAMPUS & COMMUNITY</p><h1>The latest from UMMG.</h1><NewsFeed /></main><Footer /></>;
}
