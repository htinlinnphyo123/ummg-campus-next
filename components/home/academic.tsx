import React from 'react';
import Title from './title';

export default function AcademicSection() {
  return (
    <section id='academic'>
      <div className="mx-auto px-4 lg:px-8">
        <Title name='ACADEMIC SECTION' className='text-center' />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className=" p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl dark:bg-white dark:text-gray-900">
            <h3 className="text-2xl font-bold mb-4">
              ACADEMIC PROGRAMS
            </h3>
            <p className="leading-relaxed">
              The UMMG currently offers MBBS degree programs, M.Med.Sc. degree
              programs, and PhD programs in medical science.
            </p>
          </div>

          <div className=" p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl dark:bg-white dark:text-gray-900">
            <h3 className="text-2xl font-bold mb-4">
              THE CURRICULUM OF UNDERGRADUATE PROGRAMS
            </h3>
            <p className="leading-relaxed">
              The current curriculum is a Traditional discipline-based curriculum, consisting
              of knowledge and attitude acquired on the basis of learning medical courses,
              followed by training for pre-clinical subjects which cover basic medical science
              subjects, public health subjects and legal medicine. Students who pass the
              summative assessments are forwarded to clinical years. Then a one-year
              compulsory internship program ensues. The whole course extends over 7 years.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}