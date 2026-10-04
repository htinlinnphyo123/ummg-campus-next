import TimelineImage from "../../public/images/ummg/timeline.png";

export default function Timeline() {
  return (
    <section className="history-section">
      <div className="section-heading-row">
        <div><p className="eyebrow">University archive</p><h2 className="section-title">Our history</h2></div>
        <a href={TimelineImage.src} target="_blank" rel="noopener noreferrer" className="text-link">View full timeline <span aria-hidden="true">↗</span></a>
      </div>
      <a href={TimelineImage.src} target="_blank" rel="noopener noreferrer" className="history-image" aria-label="Open the university history timeline at full size">
        <img src={TimelineImage.src} alt="Timeline of the University of Medicine, Magway" loading="lazy" />
      </a>
    </section>
  );
}
