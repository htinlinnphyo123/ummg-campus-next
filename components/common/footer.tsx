import UniLogo from "../../public/images/ummg/uni_logo.png";

const Footer = () => (
  <footer className="site-footer">
    <div className="page-width">
      <div className="footer-grid">
        <div>
          <img className="footer-seal" src={UniLogo.src} alt="University seal" width={56} height={56} />
          <h2>University of Medicine,<br />Magway</h2>
          <p>7th Mile, Natmauk Road<br />Magway City, Magway Region, Myanmar</p>
        </div>
        <div>
          <h3>University</h3>
          <nav aria-label="University information">
            <a href="/#about">About UMMG</a>
            <a href="/#iuc">Interim University Council</a>
            <a href="/#academic">Academic programmes</a>
            <a href="/news">News & notices</a>
          </nav>
        </div>
        <div>
          <h3>Contact & resources</h3>
          <nav aria-label="University social links">
            <a href="mailto:office@ummg-campus.org">office@ummg-campus.org</a>
            <a href="https://education.ummg-campus.org/" target="_blank" rel="noopener noreferrer">Online campus ↗</a>
            <a href="https://www.facebook.com/iucummg/" target="_blank" rel="noopener noreferrer">Facebook ↗</a>
            <a href="https://t.me/ummgcampus" target="_blank" rel="noopener noreferrer">Telegram ↗</a>
            <a href="https://t.me/infoummgiuc" target="_blank" rel="noopener noreferrer">Information & enquiries ↗</a>
          </nav>
        </div>
      </div>
      <div className="footer-bottom"><span>University of Medicine, Magway</span><a href="#main-content">Back to top ↑</a></div>
    </div>
  </footer>
);
export default Footer;
