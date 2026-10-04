import Header from "../../components/Header";
import Footer from "../../components/common/footer";
import NewsFeed from "../../components/common/NewsFeed";

export default function ArticlesPage() {
  return <><Header /><main id="main-content" className="news-page page-width"><p className="eyebrow">University updates</p><h1>News & notices</h1><NewsFeed /></main><Footer /></>;
}
