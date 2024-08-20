"use client" // Indicates that this component is a client-side component in Next.js

import React, { useEffect, useState } from "react"; // Import React, useEffect, and useState hooks
import { Button } from "@/components/ui/button"; // Import the Button component from your UI library
import { useRouter } from "next/navigation"; // Import useRouter hook for navigation

function InterviewList() {
  // Define state to hold interview details and error messages
  const [interviewDetails, setInterviewDetails] = useState([]);
  const [error, setError] = useState(null);

  // Initialize useRouter hook for navigation
  const router = useRouter();

  // Function to handle navigating to the feedback page for a specific interview
  const getFeedback = (id) => {
    router.push(`/dashboard/interview/${id}/feedback`);
  }

  // Function to handle navigating to the interview start page for a specific interview
  const onStart = (id) => {
    router.push(`/dashboard/interview/${id}`);
  }

  // Function to fetch interview data from the server
  const fetchInterviewData = async () => {
    try {
      // Send a GET request to the /api/posts endpoint
      const response = await fetch("/api/posts");

      // Check if the response was successful
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse the response data to JSON format
      const data = await response.json();
      // Update the state with the fetched interview details
      setInterviewDetails(data);
    } catch (error) {
      // If an error occurs, set the error state
      setError(error.message);
    }
  };

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchInterviewData();
  }, []); // Empty dependency array means this effect runs only once after the initial render

  // Function to refresh interview data after adding a new interview
  const handleNewInterview = () => {
    fetchInterviewData(); // Re-fetch data to include the newly added interview
  }

  // Function to handle deleting an interview
  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to the /api/posts endpoint with the interview ID as a query parameter
      const response = await fetch(`/api/posts?id=${id}`, {
        method: 'DELETE',
      });

      // Check if the response was successful
      if (!response.ok) {
        throw new Error("Failed to delete the interview");
      }

      // Update the UI by removing the deleted interview from the state
      setInterviewDetails(interviewDetails.filter(interview => interview.id !== id));
    } catch (error) {
      // If an error occurs, set the error state
      setError(error.message);
    }
  }

  return (
    <>
      <div>
        <h2 className='font-medium text-xl'>Previous Mock Interviews</h2> {/* Heading for the section */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {/* Conditionally render interview details or a message if no interviews are available */}
        {interviewDetails.length > 0 ? (
          interviewDetails.map((interview) => (
            <div key={interview.id} className="relative border p-4 rounded shadow-md">
              {/* Button to delete the interview */}
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                onClick={() => handleDelete(interview.id)} // Handle delete action
              >
                &times; {/* Cross icon for delete action */}
              </button>
              <h3 className="font-bold text-blue-900 text-lg">{interview.jobposition}</h3> {/* Display job position */}
              <p className="text-gray-600"> {interview.jobExperience} years of experience</p> {/* Display job experience */}
              <p className="text-gray-400"> createdAt: {new Date(interview.createdAt).toLocaleDateString()}</p> {/* Display creation date */}

              <div className="flex justify-between m-2 gap-4">
                {/* Button to navigate to feedback page */}
                <Button size='sm' variant="outline" className="w-full"
                  onClick={() => getFeedback(interview.id)}
                >
                  Feedback
                </Button>
                {/* Button to navigate to interview start page */}
                <Button size='sm' className="w-full" onClick={() => onStart(interview.id)}>
                  Start
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p>No interview details available.</p> /* Message if no interviews are available */
        )}
        {error && <p className="text-red-500">{error}</p>} {/* Display error message if any */}
      </div>
    </>
  );
}

export default InterviewList;
