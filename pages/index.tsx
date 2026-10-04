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
        <Article />
        <div className="section-band">
          <About />
          <Vision />
        </div>
        <div className="content-block page-width"><Timeline /></div>
        <div className="section-band">
          <div className="content-block page-width"><Nostalgia /><IUCCoreCommittee /></div>
        </div>
        <div className="content-block page-width"><AcademicSection /><Curriculum /></div>
        <div className="section-band">
          <div id="registration" className="content-block page-width"><CurrentAcademic /></div>
        </div>
        <div className="content-block page-width"><Collaborations /></div>
      </main>
      <Footer />
    </div>
  );
}
