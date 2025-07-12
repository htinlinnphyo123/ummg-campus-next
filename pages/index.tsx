import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import Header from "../components/Header";
import About from "../components/home/About";
import Banner from "../components/home/Banner"
import Nostalgia from "../components/home/Nostalgia"
import Timeline from "../components/home/Timeline"
import Vision from "../components/home/Vision"
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 min-h-screen text-black dark:text-white">
      <Header />
      <Banner />
      <About title="About UMMG" />
      <Vision />
      <Timeline />
      <Nostalgia />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || "en", ["common"])),
  },
});
