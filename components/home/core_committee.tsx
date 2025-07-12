import React from 'react';
import Title from './title';
import c1 from '../../public/images/ummg/C1_icon.webp'
import c2 from '../../public/images/ummg/C2_icon.png'
import c3 from '../../public/images/ummg/C3_icon.png'
import Image from 'next/image';

const IUCCoreCommittee = () => {
  return (
    <div className="py-4 px-4 lg:px-8">
      <div className="mx-auto">
        <Title name="The Core Committee of IUC" className='text-center'/>        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-none">
          <div className="bg-white rounded-lg shadow-md cursor-pointer p-6 border border-gray-200 flex flex-col hover:shadow-2xl">
            <div className="flex justify-center mb-6">
              <Image src={c1.src} width={100} height={100} alt="C1" />
            </div>
            
            <h2 className="text-xl font-bold text-purple-600 text-center mb-4">
              THE ACADEMIC COMMITTEE
            </h2>
            
            <div className="text-gray-700 text-sm space-y-4">
              <p>
                The Academic Committee is implementing academic programs for teachers and students. The academic programs include
              </p>
              
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Capacity building/knowledge sharing programs for teachers</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Creating courses for undergraduate students</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Creating extracurricular courses for personal and professional development</span>
                </li>
              </ul>
              
              <p>
                The academic committee manages the academic affairs of the students. The academic committee also develops the academic policies to be applied for the interim as well as future academic programs.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md cursor-pointer p-6 border border-gray-200 flex flex-col hover:shadow-2xl">
            <div className="flex justify-center mb-6">
                <Image src={c2.src} width={100} height={100} alt="C1" />
            </div>
            
            <h2 className="text-xl font-bold text-purple-600 text-center mb-4">
              THE GLOBAL ENGAGEMENT COMMITTEE
            </h2>
            
            <div className="text-gray-700 text-sm space-y-4">
              <p>
                The Global Engagement Committee serves to get and strengthen the engagement between the IUC and other relevant institutions. The currently collaborating institutions/organization include
              </p>
              
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>The interim councils of other medical/medical-related universities</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>The Myanmar Medical Diasporas Association</span>
                </li>
              </ul>
              
              <p>
                The activities of the committee also include seeking and providing opportunities to participate in international academic programs for the teachers and students
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md cursor-pointer p-6 border border-gray-200 flex flex-col hover:shadow-2xl">
            <div className="flex justify-center mb-6">
                <Image src={c3.src} width={100} height={100} alt="C1" />
            </div>
            
            <h2 className="text-xl font-bold text-purple-600 text-center mb-4">
              THE CDM COMMITTEE
            </h2>
            
            <div className="text-gray-700 text-sm space-y-4">
              <p>
                The CDM committee is responsible to give support to CDM staff and CDM students during the interim period
              </p>
              
              <p>The activities of the committee include</p>
              
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Developing CDM policies for staff and students</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Maintaining and strengthening the engagement between IUC and the CDM staff and CDM students</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Managing the welfare of the CDM staffs and CDM students</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IUCCoreCommittee;