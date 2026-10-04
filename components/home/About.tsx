import UniLogo from "../../public/images/ummg/uni_logo.png";

export default function About() {
  return (
    <section id="about" className="about-section page-width">
      <div className="about-intro"><p className="eyebrow">01 / WHO WE ARE</p><h2>More than a campus.<br /><span className="serif-word">A community.</span></h2><a className="text-link" href="#iuc">Meet our university council <span aria-hidden="true">↗</span></a></div>
      <div className="about-copy"><p>University of Medicine, Magway (UMMG) is one of the five medical universities in Myanmar. Known as the <strong>Union University</strong>, we bring together students from across the country, united by a commitment to medicine.</p><p>Located seven miles east of Magway, our community is working towards an autonomous, learner-focused university alongside the establishment of federalism.</p></div>
      <div className="university-seal"><img src={UniLogo.src} alt="University of Medicine, Magway seal" width={140} height={140} /><span>ONE COMMUNITY.<br />A SHARED PURPOSE.</span></div>
    </section>
  );
}
