import React from 'react';
import Title from './title';
import Image from 'next/image';
import ObicImage from '../../public/images/ummg/OBIC.png'

export default function Curriculum() {
  return (
    <section>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-start">
          <div className="w-full lg:w-1/2">
            <Title name='OUTCOME-BASED INTEGRATE CURRICULUM (OBIC)' className='text-2xl' />
            <p className="text-md">
              Recently, an outcome-based Integrated Curriculum (OBIC) was introduced in 2020
              based on the following domains:
            </p>
            <ul className="list-disc list-inside text-md mb-6 space-y-2 pl-4">
              <li>Medical knowledge</li>
              <li>Patient care</li>
              <li>Practice-based learning</li>
              <li>System-based practice</li>
              <li>Ethics and professionalism</li>
              <li>Interpersonal and communication skills.</li>
              <li>Medical knowledge</li>
            </ul>
            <p className="text-md leading-relaxed">
              The duration of the course is 6 years, composed of Foundation Year (FY), Pre-
              clinical years (M1 & M2), and clinical years (M3, M4 and M5). The OBIC is not fully
              developed and the developing process was interrupted because of the coup.
            </p>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="max-w-full rounded-lg shadow-lg overflow-hidden">
              <a href="/curriculum-details" target="_blank" rel="noopener noreferrer">
                <Image
                    src={ObicImage.src}
                    width={600} height={300}
                    alt='OBIC UMMG'
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}