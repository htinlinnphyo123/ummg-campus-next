const programmes = [
  { level: "Undergraduate", name: "MBBS", description: "Undergraduate medical education and clinical training." },
  { level: "Postgraduate", name: "M.Med.Sc.", description: "Postgraduate study in medical science." },
  { level: "Research", name: "PhD", description: "Doctoral programmes in medical science." },
];

export default function AcademicSection() {
  return (
    <section id="academic" className="academic-section">
      <div className="section-heading-row">
        <div><p className="eyebrow">Study at UMMG</p><h2 className="section-title">Academic programmes</h2></div>
        <a href="#curriculum" className="text-link">Explore the curriculum <span aria-hidden="true">↓</span></a>
      </div>
      <div className="programme-grid">
        {programmes.map((programme) => (
          <article className="programme-card" key={programme.name}>
            <p className="programme-level">{programme.level}</p>
            <h3>{programme.name}</h3>
            <p>{programme.description}</p>
          </article>
        ))}
      </div>
      <div className="study-path">
        <h3>The undergraduate pathway</h3>
        <div>
          <p>The traditional discipline-based curriculum progresses from basic medical science, public health and legal medicine to clinical study. Students who pass the summative assessments continue to clinical years, followed by a compulsory one-year internship.</p>
          <ol aria-label="Traditional undergraduate study pathway">
            <li>Basic medical science</li><li>Clinical study</li><li>Internship</li>
          </ol>
          <p className="path-note">The traditional course extends over seven years.</p>
        </div>
      </div>
    </section>
  );
}
