import CurrentImg from "../../public/images/ummg/street.jpg";

export default function CurrentAcademic() {
  return (
    <section className="registration-layout">
      <div>
        <h2 className="section-title">The online campus</h2>
        <p>
          The IUC developed a virtual campus to continue delivering education to
          CDM students. The Moodle-based learning platform provides course
          materials based on the traditional discipline-based curriculum while
          the outcome-based integrated curriculum is being developed.
        </p>
        <div className="registration-panel">
          <h3>Register for the online campus</h3>
          <p>All CDM students are eligible to register. Contact the campus team for registration information.</p>
          <a className="neo-button button-small" href="https://t.me/ummgcampus" target="_blank" rel="noopener noreferrer">Registration enquiries <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <figure>
        <img src={CurrentImg.src} alt="University of Medicine, Magway entrance" loading="lazy" />
        <figcaption>The university entrance, Magway</figcaption>
      </figure>
    </section>
  );
}
