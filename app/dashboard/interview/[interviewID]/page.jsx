"use client"; // This indicates that the component is a client-side component

import { Button } from "@/components/ui/button"; // Importing the Button component from the UI library
import { WebcamIcon } from "lucide-react"; // Importing the WebcamIcon component from the lucide-react icon library
import React, { useEffect, useState } from "react"; // Importing React and necessary hooks
import Webcam from "react-webcam"; // Importing the Webcam component to handle video input
import { Lightbulb } from "lucide-react";
import { useRouter } from "next/navigation"; // Import the useRouter hook

function Interview({ params }) {
  const router = useRouter(); // Initialize the useRouter hook

  // State variables to manage interview details, loading status, error messages, and webcam status
  const [interviewDetails, setInterviewDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [interviewId, setInterviewId] = useState(null); // State to hold the interview ID

  // useEffect hook to fetch interview details when the component mounts
  useEffect(() => {
    const fetchInterviewDetails = async () => {
      try {
        const response = await fetch("/api/posts"); // Making a GET request to the /api/posts endpoint
        
        if (!response.ok) {
          throw new Error("Network response was not ok"); // Throw an error if the network response fails
        }

        const data = await response.json(); // Parsing the JSON data from the response
        const matchingDetail = data.find(item => item.id === params.interviewID);

        setInterviewDetails(matchingDetail);
        setInterviewId(params.interviewID); // Update the interview ID state

      } catch (error) {
        setError(error.message); // Capture any errors that occur during the fetch process
      } finally {
        setLoading(false); // Set the loading state to false after data is fetched or an error occurs
      }
    };

    fetchInterviewDetails(); // Invoke the function to fetch interview details
  }, [params.interviewID]); // Dependency array includes params.interviewID

  // Function to handle the start interview button click
  const handleStartInterview = () => {
    if (interviewId) {
      router.push(`${interviewId}/start`); // Redirect to the dynamic interview page
    } else {
      console.error("Interview ID not found!"); // Handle the case where interviewId is not available
    }
  };

  return (
    <div className="my-10 flex flex-col px-2 md:px-4">
      <h2 className="font-bold text-2xl ml-4 mb-4 text-left">
        Let's Get Started
      </h2>
      <div className="flex flex-col md:flex-row md:space-x-6 md:space-y-0 space-y-6">
        <div className="flex flex-col md:w-1/2 space-y-4">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : interviewDetails ? (
            <div className="bg-white border rounded-lg shadow-md p-4 w-full flex-grow">
              <div className="flex flex-col sm:flex-row items-start sm:items-center my-5 gap-2">
                <h3 className="font-bold text-base sm:text-lg">
                  Job Role/Job Position:
                </h3>
                <p className="text-gray-900 text-base sm:text-lg sm:ml-2">
                  {interviewDetails.jobposition}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center my-5 gap-2">
                <h3 className="font-bold text-base sm:text-lg">
                  Job Description/Tech Stack:
                </h3>
                <p className="text-gray-900 text-base sm:text-lg sm:ml-2">
                  {interviewDetails.jobDescription}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center my-5 gap-2 ">
                <h3 className="font-bold text-base sm:text-lg">
                  Years of Experience:
                </h3>
                <p className="text-gray-900 text-base sm:text-lg sm:ml-2">
                  {interviewDetails.jobExperience}
                </p>
              </div>
            </div>
          ) : (
            <p>No interview details found.</p>
          )}

          <div className="flex-grow bg-yellow-100 border-t-4 border-yellow-500 rounded-lg p-5 text-yellow-700 shadow-md">
            <div className="flex flex-col ">
              <h2 className="flex gap-2 items-center text-yellow-900">
                <Lightbulb />
                <strong>Information</strong>
              </h2>
              <h2 className="mt-3 ">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:w-1/2 space-y-4">
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              className="w-full h-auto md:w-3/4 md:h-64"
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full p-10 my-7 bg-secondary rounded-lg border" />
              <Button
                className="w-full bg-white text-black text-lg hover:bg-gray-300 rounded-lg border"
                onClick={() => setWebCamEnabled(true)}
              >
                Enable Web Cam & Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end mt-10">
        <Button onClick={handleStartInterview}>Start Interview</Button>
      </div>
    </div>
  );
}

export default Interview;
