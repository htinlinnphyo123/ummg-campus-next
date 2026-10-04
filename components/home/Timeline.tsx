import TimelineImage from "../../public/images/ummg/timeline.png"
import Title from "./title"
export default function Timeline() {
  return (
    <section className="px-4 sm:px-6 lg:px-16">
      <div className="mx-auto text-center">
        <Title name="University history" />
        <div className="relative w-full">
          <img
            src={TimelineImage.src}
            alt="University history"
            className="w-full h-full object-contain bg-white p-3 rounded-md"
          />
        </div>
      </div>
    </section>
  );
}
