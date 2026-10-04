import Header from "../components/Header";
import About from "../components/home/About";
import Banner from "../components/home/Banner";
import Nostalgia from "../components/home/Nostalgia";
import Timeline from "../components/home/Timeline";
import Vision from "../components/home/Vision";
import IUCCoreCommittee from "../components/home/core_committee";
import AcademicSection from "../components/home/academic";
import Curriculum from "../components/home/curriculum";
import Article from "../components/home/Articles";
import Collaborations from "../components/home/collaborations";
import CurrentAcademic from "../components/home/current-academic";
import Footer from "../components/common/footer";

export default function Home() {
  return (
    <div className="campus-site">
      <Header isHomePage />
      <main id="main-content">
        <Banner />
        <About />
        <Vision />
        <div className="section-band"><div className="content-block page-width"><p className="eyebrow">02 / OUR STORY</p><Timeline /></div></div>
        <div className="content-block page-width"><p className="eyebrow">03 / PEOPLE & PURPOSE</p><Nostalgia /><IUCCoreCommittee /></div>
        <div className="section-band academic-band"><div className="content-block page-width"><p className="eyebrow">04 / LEARNING WITHOUT LIMITS</p><AcademicSection /><Curriculum /></div></div>
        <Article />
        <div className="section-band"><div className="content-block page-width"><p className="eyebrow">06 / YOUR NEXT CHAPTER</p><CurrentAcademic /></div></div>
        <div className="content-block page-width"><p className="eyebrow">07 / STRONGER TOGETHER</p><Collaborations /></div>
      </main>
      <Footer />
    </div>
  );
}
