import ObicImage from '../../public/images/ummg/OBIC.png';

const domains = [
  'Medical knowledge',
  'Patient care',
  'Practice-based learning',
  'System-based practice',
  'Ethics and professionalism',
  'Interpersonal and communication skills',
];

export default function Curriculum() {
  return (
    <section id="curriculum" className="curriculum-layout">
      <div>
        <p className="eyebrow">Teaching & learning</p>
        <h2 className="section-title">Outcome-based<br />integrated curriculum</h2>
        <p>Introduced in 2020, the outcome-based integrated curriculum (OBIC) is organised around six domains.</p>
        <ul className="curriculum-domains">
          {domains.map((domain) => <li key={domain}>{domain}</li>)}
        </ul>
        <p>The six-year course comprises a Foundation Year, pre-clinical years (M1 and M2), and clinical years (M3–M5). Development of the curriculum was interrupted by the coup and remains incomplete.</p>
      </div>
      <figure className="document-figure">
        <a href={ObicImage.src} target="_blank" rel="noopener noreferrer" aria-label="View the full curriculum diagram (opens in a new tab)">
          <img src={ObicImage.src} alt="Overview of the UMMG outcome-based integrated curriculum" loading="lazy" />
          <span className="document-caption">Curriculum overview <span aria-hidden="true">View full diagram ↗</span></span>
        </a>
      </figure>
    </section>
  );
}
