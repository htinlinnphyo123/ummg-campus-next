const Collaborations = () => {
  return (
    <div className="mx-auto px-4">
      <h2 className="text-3xl font-bold text-purple-800 mb-6">COLLABORATIONS</h2>

      <p className="text-gray-700 leading-relaxed mb-6">
        IUC is in strategic collaboration with <a href="https://www.facebook.com/UMMGAlumniAssociation" className="text-blue-600 hover:underline font-semibold">UMMG Alumni Association (UMMGAA)</a>
      </p>

      <ul className="list-disc pl-5 space-y-4 text-gray-700">
        <li>
          UMMGAA is organized by UMMG alumni and carries out several activities related to humanitarian aids and human rights. UMMGAA is in close collaboration with
          UMMGIUC and is actively involved in activities to give support to CDM staff and students.
        </li>
        <li>
          IUC is also collaborating with <a href="https://www.facebook.com/ummgsu" className="text-blue-600 hover:underline font-semibold">UMMG students' Union</a> for academic opportunities to students and the support to CDM staffs which is organized by UMMG Students.
        </li>
      </ul>
      <hr className="my-8 border-gray-300" /> {/* This adds the horizontal line at the bottom */}
    </div>
  );
};

export default Collaborations;