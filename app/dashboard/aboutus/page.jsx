import React from 'react';

function About() {
  return (
    <div id="about-us" className="mt-20 p-8">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800 text-center animate-fadeIn">
        About Us
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {/* Card 1 */}
        <div className="flex flex-col p-6 bg-gradient-to-l from-white via-indigo-100 to-blue-300 rounded-lg shadow-lg border border-gray-300 w-full md:w-1/3 lg:w-1/4 hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out animate-fadeIn animate-delay-400">
        <h3 className="text-xl font-bold mb-4 text-gray-800">
            Our Mission
          </h3>
          <p className="text-gray-700 text-base leading-relaxed">
            We aim to empower individuals to reach their career aspirations
            by providing cutting-edge AI tools for effective interview
            preparation.
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col p-6 bg-gradient-to-l from-white via-indigo-100 to-blue-300 rounded-lg shadow-lg border border-gray-300 w-full md:w-1/3 lg:w-1/4 hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out animate-fadeIn animate-delay-400">
        <h3 className="text-xl font-bold mb-4 text-gray-800">
            Our Vision
          </h3>
          <p className="text-gray-700 text-base leading-relaxed">
            Our vision is to revolutionize interview training by offering a
            platform that mimics real-life interview experiences, boosting
            candidates' confidence.
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col p-6 bg-gradient-to-l from-white via-indigo-100 to-blue-300 rounded-lg shadow-lg border border-gray-300 w-full md:w-1/3 lg:w-1/4 hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out animate-fadeIn animate-delay-400">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            Why Choose Us
          </h3>
          <p className="text-gray-700 text-base leading-relaxed">
            Our platform stands out by using advanced technology to simulate
            realistic interview environments, providing unparalleled
            preparation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
