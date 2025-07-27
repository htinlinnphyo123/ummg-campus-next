import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
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
      <div className="mx-auto max-w-screen px-4 py-8 mt-16">
        <h1 className="text-xl font-bold mb-6 leading-10">{article.name}</h1>
        <div className="relative mb-6">
          <img
            src={article.image}
            alt={article.name}
            className="w-full lg:w-1/2 object-cover rounded-lg"
          />
        </div>
        <div className="w-full">
          <div
            className="leading-10 whitespace-pre-line break-words" 
            dangerouslySetInnerHTML={{ __html: article.description }}
          />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  console.log("hello");
  try {
    const response = await fetch(`${process.env.APP_URL}/api/articles/${id}`);
    console.log(response);
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
