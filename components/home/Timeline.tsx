import TimelineImage from "../../public/images/ummg/timeline.png"
import Title from "./title"
export default function Timeline() {
  return (
    <section className="px-4 sm:px-6 lg:px-16">
      <div className="mx-auto text-center">
        <Title name="Timeline of University of Medicine (Magway)" />
        <div className="relative w-full">
          <img
            src={TimelineImage.src}
            alt="Timeline of University of Medicine (Magway)"
            className="w-full h-full object-contain bg-white p-3 rounded-md"
          />
        </div>
      </div>
    </section>
  );
}
