import BannerImage from "../../public/images/ummg/banner.png";

export default function Banner() {
  return (
    <section id="home" className="hero">
      <div className="hero-inner page-width">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> KNOWLEDGE. COMPASSION. COMMUNITY.</p>
          <h1>A healthier<br />future starts<br /><span className="highlight-word">with us.</span><span className="hero-asterisk" aria-hidden="true">✳</span></h1>
          <p className="hero-description">Welcome to the University of Medicine, Magway.<br className="desktop-break" /> A community of learners, educators, and future<br className="desktop-break" /> doctors. Moving medicine forward, together.</p>
          <div className="hero-buttons">
            <a className="neo-button" href="#academic">Explore academics <span aria-hidden="true">↗</span></a>
            <a className="text-link" href="#about">Get to know UMMG <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-footnote"><span className="mini-cross" aria-hidden="true">✚</span><span>ROOTED IN MAGWAY. CONNECTED BY PURPOSE.</span></div>
        </div>
        <div className="hero-visual">
          <div className="campus-sticker">LEARN.<br />CARE.<br />MAKE A DIFFERENCE.<span aria-hidden="true">↗</span></div>
          <figure className="campus-photo">
            <div className="photo-topline"><span><i /><i /><i /></span><span>OUR CAMPUS / MAGWAY, MYANMAR</span><span aria-hidden="true">↗</span></div>
            <img src={BannerImage.src} alt="The University of Medicine, Magway campus and its medical monument" fetchPriority="high" width={1280} height={800} />
            <figcaption><span>A place to belong.<br /><strong>A purpose to believe in.</strong></span><span className="photo-arrow" aria-hidden="true">↗</span></figcaption>
          </figure>
          <span className="location-tag"><span aria-hidden="true">◎</span> MAGWAY / MYANMAR</span>
        </div>
      </div>
      <div className="values-strip" aria-label="Our values"><span>MEDICAL EDUCATION</span><span aria-hidden="true">✳</span><span>COLLECTIVE PROGRESS</span><span aria-hidden="true">✳</span><span>COMMUNITY FIRST</span><span aria-hidden="true">✳</span><span>THE NEXT GENERATION</span><span aria-hidden="true">✳</span></div>
    </section>
  );
}
