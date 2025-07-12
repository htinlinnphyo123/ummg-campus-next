import BannerImage from "@/assets/banner.png"
export default function Banner() {
  return (
    <section className="w-full relative">
      <div className="h-screen w-full relative overflow-hidden">
        <img
          src={BannerImage}
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
            <button className="mt-4 px-8 py-3 bg-university-purple hover:bg-purple-700 text-white rounded-full transition-colors duration-300 animate-fade-in-delay-2">
              Explore More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
