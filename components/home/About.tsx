import Title from './title'
import UniLogo from "../../public/images/ummg/uni_logo.png"
export default function About() {
    return (
        <section className="pt-10 pb-4 px-4 sm:px-6 lg:px-20">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Title name='About UMMG' />
              <p className="text-lg leading-relaxed">
                University of Medicine Magway (UMMG) is one of the five medical universities in Myanmar. It is located 7 miles east of Magway Township, Magway Division, Myanmar. UMMG is reputed as the Union University as many students from different places of the country come to attend. After the coup de ’tat, along with the establishment of federalism, we are in a transitional period to be an autonomous university.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="flex items-center justify-center">
                <img src={UniLogo.src} alt="University Logo" className="w-1/2" />
              </div>
            </div>
          </div>
        </section>
    )
}