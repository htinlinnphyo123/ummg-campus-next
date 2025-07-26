import BannerImage from "../../public/images/ummg/banner.png"
export default function Banner() {
  return (
    <section id="home" className="w-full relative">
      <div className="h-[80vh] w-full relative overflow-hidden">
        <img
          src={BannerImage.src}
          alt="UMMG Campus Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white space-y-6 px-4">
            <h2 className="text-5xl md:text-6xl font-bold animate-fade-in font-serif tracking-wide">
              Welcome to UMMG
            </h2>
            <p className="text-xl md:text-2xl font-light animate-fade-in-delay">
              ကျောင်းမတက်နဲ့ကျောင်းထွက်
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
