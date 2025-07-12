import TimelineImage from "../../public/images/ummg/timeline.png"
export default function Timeline() {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="text-lg lg:text-3xl font-bold text-university-purple mb-4">
          TIMELINE OF UNIVERSITY OF MEDICINE (MAGWAY)
        </h3>
        <div className="relative w-full">
          <img
            src={TimelineImage.src}
            alt="Timeline of University of Medicine (Magway)"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
