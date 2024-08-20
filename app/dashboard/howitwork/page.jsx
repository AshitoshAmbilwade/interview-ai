import React from 'react';

function HowItWorks() {
  return (
    <div className="py-12 md:py-16">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">How It Works</h2>
      <div className="flex flex-col md:flex-row justify-center gap-8 px-4 md:px-0">
        <div className="w-full md:w-80 max-w-sm mx-auto md:mx-0 bg-gradient-to-l from-white via-indigo-100 to-blue-300 border border-gray-300 rounded-lg shadow-lg p-6 md:p-8 transform transition duration-300 ease-in-out hover:scale-90">
          <h3 className="text-xl md:text-2xl font-semibold mb-4">Step 1</h3>
          <p className="text-gray-700 text-base md:text-lg">Sign up to access our AI-powered interview preparation tool.</p>
        </div>

        <div className="w-full md:w-80 max-w-sm mx-auto md:mx-0 bg-gradient-to-l from-white via-indigo-100 to-blue-300 border border-gray-300 rounded-lg shadow-lg p-6 md:p-8 transform transition duration-300 ease-in-out hover:scale-110">
          <h3 className="text-xl md:text-2xl font-semibold mb-4">Step 2</h3>
          <p className="text-gray-700 text-base md:text-lg">Use our interactive tool to practice common interview questions and get real-time feedback.</p>
        </div>

        <div className="w-full md:w-80 max-w-sm mx-auto md:mx-0 bg-gradient-to-l from-white via-indigo-100 to-blue-300 border border-gray-300 rounded-lg shadow-lg p-6 md:p-8 transform transition duration-300 ease-in-out hover:scale-90">
          <h3 className="text-xl md:text-2xl font-semibold mb-4">Step 3</h3>
          <p className="text-gray-700 text-base md:text-lg">Receive personalized tips and recommendations to improve your interview performance.</p>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
