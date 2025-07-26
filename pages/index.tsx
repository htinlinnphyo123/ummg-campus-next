import Header from "../components/Header";
import About from "../components/home/About";
import Banner from "../components/home/Banner"
import Nostalgia from "../components/home/Nostalgia"
import Timeline from "../components/home/Timeline"
import Vision from "../components/home/Vision"
import IUCCoreCommittee from "../components/home/core_committee"
import AcademicSection from "../components/home/academic"
import { useEffect, useState } from "react";
import Curriculum from "../components/home/curriculum";
import Divider from '../components/common/CustomDivider';
import Article from '../components/home/Articles'
import Collaborations from '../components/home/collaborations'
import CurrentAcademic from '../components/home/current-academic'
import Footer from "@/common/footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10);

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
      <Header isHomePage={true} />
      <Banner />  
      <About />
      <Divider />
      <Vision />
      <Divider />
      <Timeline />
      <Divider />
      <Nostalgia />
      <Divider />
      <IUCCoreCommittee />
      <Divider />
      <AcademicSection />
      <Divider />
      <Curriculum />
      <Divider />
      <Article />
      <Divider />
      <CurrentAcademic />
      <Divider />
      <Collaborations />
      <Footer />
    </div>
  );
}
