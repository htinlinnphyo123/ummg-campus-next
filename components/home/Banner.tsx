import BannerImage from "../../public/images/ummg/banner.png";

export default function Banner() {
  return (
    <section id="home" className="hero page-width">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">Magway, Myanmar</p>
          <h1>University of<br />Medicine,<br /><span>Magway.</span></h1>
          <p className="hero-description">
            Medical education, research and a commitment to the people we serve.
            Welcome to the UMMG university community.
          </p>
          <div className="hero-actions">
            <a className="neo-button" href="#academic">Academic programmes <span aria-hidden="true">→</span></a>
            <a className="text-link" href="#about">About UMMG</a>
          </div>
        </div>
        <figure className="campus-photo">
          <img
            src={BannerImage.src}
            alt="The medical monument and main building at the University of Medicine, Magway"
            fetchPriority="high"
            width={1280}
            height={800}
          />
          <figcaption><span>University of Medicine, Magway</span><span>Main campus</span></figcaption>
        </figure>
      </div>
      <nav className="campus-services" aria-label="Student resources">
        <a href="https://education.ummg-campus.org/" target="_blank" rel="noopener noreferrer">
          <span><small>For students & teachers</small><strong>Online learning campus</strong></span><span aria-hidden="true">↗</span>
        </a>
        <a href="#registration">
          <span><small>Getting started</small><strong>Campus registration</strong></span><span aria-hidden="true">→</span>
        </a>
        <a href="https://t.me/infoummgiuc" target="_blank" rel="noopener noreferrer">
          <span><small>University enquiries</small><strong>Contact the university</strong></span><span aria-hidden="true">↗</span>
        </a>
      </nav>
    </section>
  );
}
