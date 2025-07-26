import CurrentImg from "../../public/images/ummg/street.jpg"

const AcademicPrograms = () => {
  return (
    <div className="mx-auto px-4 py-8 flex flex-col lg:flex-row items-center lg:items-start gap-8">
      <div className="lg:w-1/2">
        <img
          src={CurrentImg.src}
          alt="University of Medicine - Magway Entrance"
          className="rounded-lg shadow-lg w-full h-auto object-cover"
        />
      </div>

      <div className="lg:w-1/2 flex flex-col gap-8">
        <div>
          <h2 className="text-xl font-bold text-purple-600 mb-4">CURRENT ACADEMIC PROGRAMS</h2>
          <p className="text-gray-700 dark:text-white leading-relaxed mb-4">
            For the present time, as the right to education is being oppressed by the military,
            the IUC developed a virtual online campus to continue delivering education to
            CDM students. The online campus is a Moodle-based learning platform and the
            learning materials are being uploaded. As the outcome-based integrated
            curriculum is not fully developed, the education on the online campus is based
            on the traditional discipline-based curriculum.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-purple-600 mb-4">HOW TO REGISTER FOR UMMG ONLINE CAMPUS</h2>
          <p className="text-gray-700 dark:text-white leading-relaxed mb-4">
            All CDM students are eligible for registering for the UMMG online campus.
          </p>
        </div>

        {/* Contact Us */}
        <p className="text-gray-600 dark:text-white mt-4">
          To inquiry further information <a href="https://t.me/ummgcampus" className="text-blue-600 hover:underline" target="_blank">Contact Us</a>
        </p>
      </div>
    </div>
  );
};

export default AcademicPrograms;