import Nostalgic from "@/assets/nostalgic.jpg"
export default function LwnYaTaeNayYarLay() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-2 lg:px-10">
      <div className="md:text-left text-center md:w-1/2">
        <h3 className="text-lg lg:text-4xl font-bold text-university-purple mb-6">
          INTERIM UNIVERSITY COUNCIL
        </h3>
        <p className="font-bold">
          On February 1, 2021, the coup d‘ etat started in Myanmar. The people
          protested the coup through a wide range of non-violent methods most
          notably Civil Disobedience Movements initiated by doctors, nurses and
          medical professionals. Schools and universities protested education
          under military rule by closing down.
          <br />
          The Interim National Unity Government, the legitimate government of
          Myanmar, was formed and was recognized as the legitimate government of
          Myanmar by the mass. The Interim University Council (IUC) of UMMG was
          organised on 19 May 2021 and the Interim National Unity Government
          recognized the Council as the highest authority of the University on
          30 May 2021.
          <br />
          
          The council's power is derived from the students,
          teachers and staff of the university.
        </p>
      </div>
      <div className="md:w-1/2">
        <img
          src={Nostalgic}
          alt="Core Committee"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
