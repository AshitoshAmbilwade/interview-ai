"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs"; // Import Clerk's useUser hook for authentication

function InterviewList() {
  const [interviewDetails, setInterviewDetails] = useState([]); // Store interviews
  const [error, setError] = useState(null); // Store errors
  const [loading, setLoading] = useState(true); // Track loading state
  const router = useRouter(); // Next.js router
  const { user } = useUser(); // Fetch current authenticated user from Clerk
  const userEmail = user?.emailAddresses[0]?.emailAddress; // Extract the email of the authenticated user

  // Function to navigate to feedback page for a specific interview
  const getFeedback = (id) => {
    router.push(`/dashboard/interview/${id}/feedback`);
  };

  // Function to navigate to the interview start page for a specific interview
  const onStart = (id) => {
    router.push(`/dashboard/interview/${id}`);
  };

  // Function to fetch interview data
  const fetchInterviewData = async () => {
    try {
      setLoading(true); // Start loading
      const response = await fetch("/api/posts");
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("No interviews found.");
        } else {
          throw new Error("An unexpected error occurred.");
        }
      }
      const data = await response.json();
      // Filter interviews created by the authenticated user
      const filteredData = data.filter((interview) => interview.createdBy === userEmail);
      setInterviewDetails(filteredData); // Set filtered interviews to state
    } catch (error) {
      setError(error.message); // Set error message
    } finally {
      setLoading(false); // End loading
    }
  };

  // Fetch interview data on component mount
  useEffect(() => {
    if (userEmail) {
      fetchInterviewData();
    }
  }, [userEmail]); // Run whenever userEmail changes

  // Handle deleting an interview
  const handleDelete = async (id) => {
    const updatedInterviews = interviewDetails.filter((interview) => interview.id !== id);
    setInterviewDetails(updatedInterviews); // Optimistic UI update

    try {
      const response = await fetch(`/api/posts?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the interview");
      }
    } catch (error) {
      setError(error.message);
      setInterviewDetails(interviewDetails); // Revert UI update on error
    }
  };

  return (
    <>
      <div>
        <h2 className="font-medium text-xl">Previous Mock Interviews</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {/* Conditionally render loading, interview details, or a message */}
        {loading ? (
          <p>Loading interviews...</p>
        ) : interviewDetails.length > 0 ? (
          interviewDetails.map((interview) => (
            <div key={interview.id} className="relative border p-4 rounded shadow-md">
              {/* Delete button */}
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                onClick={() => handleDelete(interview.id)}
              >
                &times;
              </button>
              <h3 className="font-bold text-blue-900 text-lg">{interview.jobposition}</h3>
              <p className="text-gray-600">{interview.jobExperience} years of experience</p>
              <p className="text-gray-400">
                createdAt: {new Date(interview.createdAt).toLocaleDateString()}
              </p>

              <div className="flex justify-between m-2 gap-4">
                <Button size="sm" variant="outline" className="w-full" onClick={() => getFeedback(interview.id)}>
                  Feedback
                </Button>
                <Button size="sm" className="w-full" onClick={() => onStart(interview.id)}>
                  Start
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>No interview details available.</p>
          </div>
        )}
        {/* Display error if any */}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </>
  );
}

export default InterviewList;
