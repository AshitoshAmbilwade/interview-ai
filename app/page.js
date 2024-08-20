import Link from "next/link";
import { Button } from "@/components/ui/button";

import HowItWorks from "./dashboard/howitwork/page";
import Header from "./Header/Header";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-l from-white via-indigo-100 to-blue-300 text-gray-800">
      <Header />
      <div className="relative flex-1 text-center py-8 md:py-16">
        <div id="dashboard" className="mt-10 md:mt-20 px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
            Your Personal AI Interview Coach
          </h1>
          <p className="text-gray-600 text-lg md:text-2xl mb-6">
            Double your chances of landing on your dream job offer, with our
            AI-powered interview tool.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8">
            <Link href="/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2Fdashboard">
              <Button className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-blue-700 text-white border-0 rounded-lg shadow-lg hover:from-blue-400 hover:to-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
                Get Started
              </Button>
            </Link>
            <Link href="/watch-video">
              <Button className="w-full md:w-auto bg-gradient-to-r from-gray-500 to-gray-700 text-white border-0 rounded-lg shadow-lg hover:from-gray-400 hover:to-gray-600 transition duration-300 ease-in-out transform hover:scale-105">
                Watch Video
              </Button>
            </Link>
          </div>
        </div>

        <section id="how-it-works">
          {/* How It Works Section */}
          <HowItWorks />
        </section>

        {/* Single Get Started Button at the End */}
        <div className="mt-4 mb-10 md:mt-2 flex justify-center px-4">
          <Link href="http://localhost:3000/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2Fdashboard">
            <Button className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-blue-700 text-white border-0 rounded-lg shadow-lg hover:from-blue-400 hover:to-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
              Get Started
            </Button>
          </Link>
        </div>

     {/* About Us Section */}
<div id="about-us" className="mt-20 p-8">
  <h2 className="text-3xl font-semibold mb-8 text-gray-800 text-center animate-fadeIn">
    About Us
  </h2>

  <div className="flex flex-wrap justify-center gap-8">
    {/* Card 1 */}
    <div className="flex flex-col p-6 rounded-lg shadow-lg border border-gray-300 w-full md:w-1/3 lg:w-1/4 hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out animate-fadeIn animate-delay-200">
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
    <div className="flex flex-col p-6 rounded-lg shadow-lg border border-gray-300 w-full md:w-1/3 lg:w-1/4 hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out animate-fadeIn animate-delay-300">
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
    <div className="flex flex-col p-6 rounded-lg shadow-lg border border-gray-300 w-full md:w-1/3 lg:w-1/4 hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out animate-fadeIn animate-delay-400">
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

      </div>
    </div>
  );
}
