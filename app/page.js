"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HowItWorks from "./dashboard/howitwork/page";
import Header from "./Header/Header";
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleGetStartedClick = () => {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in?redirect_url=" + encodeURIComponent("/dashboard"));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-l from-white via-indigo-100 to-blue-400 text-gray-800">
      <Header />
      <div className="relative flex-1 text-center py-12 md:py-20">
        <div id="dashboard" className="mt-16 md:mt-20 px-6">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 animate-fadeIn hover:text-blue-600 transition-all duration-300 ease-in-out hover:scale-105">
            Your Personal AI Interview Coach
          </h1>

          {/* Subheading/Paragraph */}
          <p className="text-gray-600 text-xl md:text-2xl mb-8 animate-slideUp hover:text-gray-800 transition-colors duration-300 ease-in-out">
            Double your chances of landing your dream job offer with our AI-powered interview tool.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8">
            <Button
              className="w-full md:w-auto bg-blue-600 text-white border-0 shadow-lg hover:bg-blue-500 transition-transform duration-300 ease-in-out transform hover:scale-110"
              onClick={handleGetStartedClick}
            >
              Get Started
            </Button>
            <Link href="/watch-video">
              <Button className="w-full md:w-auto bg-gray-600 text-white border-0 shadow-lg hover:bg-gray-500 transition-transform duration-300 ease-in-out transform hover:scale-110">
                Watch Video
              </Button>
            </Link>
          </div>
        </div>

        {/* Section: "Get Ready for Jobs at Leading Firms" */}
        <section id="leading-firms" className="mt-16 md:mt-20 px-6 md:px-20 lg:px-32 py-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 animate-fadeIn hover:text-indigo-600 transition-colors duration-300 ease-in-out">
            Get Ready for Jobs at Leading Firms
          </h2>
          <p className="text-gray-600 text-lg md:text-xl mb-12 text-center md:px-8 hover:text-gray-800 transition-colors duration-300 ease-in-out">
            InterviewAI users trust our advanced mock interview platform to prepare for opportunities at top companies. Hone your skills with realistic simulations and get ready to succeed at leading employers like those featured below!
          </p>
          <div className="flex justify-center animate-zoomIn">
            <img
              src="/company.png"
              alt="Get Ready for Jobs at Leading Firms"
              className="w-full md:w-2/3 lg:w-1/2 shadow-lg border transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-2xl"
            />
          </div>
        </section>

        {/* Section: "How It Works" */}
        <section id="how-it-works" className="mt-16 md:mt-20 py-12 px-6 md:px-20">
          <HowItWorks />
        </section>

        {/* Single Get Started Button */}
        <div className="mt-20 mb-12 flex justify-center px-6">
          <Button
            className="w-full md:w-auto bg-blue-600 text-white border-0 shadow-lg hover:bg-blue-500 transition-transform duration-300 ease-in-out transform hover:scale-110"
            onClick={handleGetStartedClick}
          >
            Get Started
          </Button>
        </div>

        {/* About Us Section */}
        <div id="about-us" className="mt-16 md:mt-20 p-12 px-6 md:px-20 lg:px-32 py-12">
          <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center animate-fadeIn hover:text-blue-600 transition-colors duration-300 ease-in-out">
            About Us
          </h2>
          <div className="flex flex-wrap justify-center gap-8 animate-fadeIn">
            {/* Card 1 */}
            <div className="flex flex-col p-8 shadow-lg border w-full md:w-1/3 lg:w-1/4 bg-gradient-to-l from-white via-indigo-100 to-blue-200 hover:shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105">
              <h3 className="text-xl font-bold mb-4 text-gray-800 hover:text-blue-600 transition-colors duration-300 ease-in-out">
                Our Mission
              </h3>
              <p className="text-gray-700 text-base leading-relaxed hover:text-gray-900 transition-colors duration-300 ease-in-out">
                We aim to empower individuals to reach their career aspirations by providing cutting-edge AI tools for effective interview preparation.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col p-8 shadow-lg border w-full md:w-1/3 lg:w-1/4 bg-gradient-to-l from-white via-indigo-100 to-blue-200 hover:shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105">
              <h3 className="text-xl font-bold mb-4 text-gray-800 hover:text-blue-600 transition-colors duration-300 ease-in-out">
                Our Vision
              </h3>
              <p className="text-gray-700 text-base leading-relaxed hover:text-gray-900 transition-colors duration-300 ease-in-out">
                Our vision is to revolutionize interview training by offering a platform that mimics real-life interview experiences, boosting candidates' confidence.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col p-8 shadow-lg border w-full md:w-1/3 lg:w-1/4 bg-gradient-to-l from-white via-indigo-100 to-blue-200 hover:shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105">
              <h3 className="text-xl font-bold mb-4 text-gray-800 hover:text-blue-600 transition-colors duration-300 ease-in-out">
                Why Choose Us
              </h3>
              <p className="text-gray-700 text-base leading-relaxed hover:text-gray-900 transition-colors duration-300 ease-in-out">
                Our platform stands out by using advanced technology to simulate realistic interview environments, providing unparalleled preparation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
