import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Footer from "../../components/common/footer";
import { useRouter } from "next/router";
import React from "react";
import Header from "../../components/Header";

interface ArticleDetailProps {
  article: {
    id: string;
    name: string;
    description: string;
    image: string;
  };
}

const ArticleDetail: NextPage<ArticleDetailProps> = ({ article }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <main id="main-content" className="article-detail page-width">
        <Link href="/news" className="text-link">← Back to all news</Link>
        <h1>{article.name}</h1>
        {article.image && <img
            src={article.image}
            alt={article.name}
            />}
        <div className="w-full">
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: article.description }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  try {
    const response = await fetch(`${process.env.APP_URL}/api/articles/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch article");
    }

    const article = await response.json();

    return {
      props: {
        article,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default ArticleDetail;
