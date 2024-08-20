'use client';

// Import React hooks and the SignIn component from Clerk
import { useEffect, useRef, useState } from 'react';
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  // Create a reference for the typewriter text element
  const typewriterRef = useRef(null);
  // State to store the width of the text for dynamic styling
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    // This effect runs after the component mounts
    if (typewriterRef.current) {
      // Calculate the width of the text element
      setTextWidth(typewriterRef.current.scrollWidth+4);
    }
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <section className="bg-white">
      {/* Main container with grid layout for responsive design */}
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Section with background image and text content */}
        <section className="relative flex flex-col justify-center items-center bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          {/* Background image with absolute positioning */}
          <img
            alt="" // Empty alt text for decorative image
            src="https://i.pinimg.com/originals/7a/59/6b/7a596b1b2ce6337d5037d4749d20e3cc.png" // URL of the background image
            className="absolute inset-0 h-full w-full opacity-90" // Full-size background with opacity
          />

          <div className="relative p-4 lg:p-10 text-center lg:text-left">
            {/* Heading with typewriter effect */}
            <h1
              ref={typewriterRef} // Attach ref to measure width
              className="text-2xl font-bold text-white lg:text-2xl sm:text-sm md:text-sm typewriter" // Styling for the heading
            >
              Welcome to IntervieweAI
            </h1>

            {/* Paragraph with additional description */}
            <p className="mt-3 text-sm leading-relaxed text-white sm:text-base md:text-sm">
              Hi, this is
              your AI-Powered Interview Coach. Get ready for your dream job with
              realistic interview simulations and instant, personalized
              feedback. Hone your skills, boost your confidence, and stand out
              in any interview.
            </p>
          </div>
        </section>

        {/* Main section with SignIn component */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              {/* Link for smaller screens (hidden on larger screens) */}
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                href="#"
              >
                <span className="sr-only">Home</span>
              </a>
            </div>
            {/* SignIn component from Clerk */}
            <SignIn />
          </div>
        </main>
      </div>

      {/* Adding typewriter effect using styled-jsx */}
      <style jsx>{`
        .typewriter {
          overflow: hidden; /* Hides overflowing text */
          white-space: nowrap; /* Prevents text from wrapping to the next line */
          border-right: 3px solid white; /* Creates a blinking cursor effect */
          width: ${textWidth}px; /* Sets the width based on the text width */
          animation: typing 7s steps(80, end) infinite, blink-caret 0.75s step-end infinite; 
        }

        @keyframes typing {
          0% { width: 0; } /* Starts with width of 0 */
          50% { width: ${textWidth}px; } /* Expands to full text width at the midpoint */
          50.1% { width: ${textWidth}px; } /* Stop for a moment at full text width */
          53.1% { width: ${textWidth}px; } /* Delay before reversing */
          100% { width: 0; } /* Resets width back to 0 to loop the animation */
        }

        @keyframes blink-caret {
          0%, 100% { border-color: transparent; } /* Hides the caret at the start and end */
          50% { border-color: white; } /* Shows the caret in the middle for blinking effect */
        }
      `}</style>
    </section>
  );
}
