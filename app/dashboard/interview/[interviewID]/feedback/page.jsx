"use client"; // Indicates that this component should be rendered on the client side

import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"; 
import { ChevronDownCircle } from "lucide-react";
import { useRouter } from 'next/navigation';

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]); // State to store feedback data
  const [error, setError] = useState(""); // State to store any errors during data fetching
  const router = useRouter();

  useEffect(() => {
    console.log(params)
    // Function to fetch feedback data from the API
    const GetFeedback = async () => {
      try {
        const response = await fetch('/api/feedbacks');
        if (!response.ok) {
          throw new Error("Network response was not ok"); // Handle non-successful responses
        }
        const jsonResponse = await response.json();
        console.log("Full Response Data:", jsonResponse); 
        
        // Filter the feedback data based on params.interviewID
        if (jsonResponse.success && jsonResponse.data && jsonResponse.data.length > 0) {
          const filteredFeedback = jsonResponse.data.filter(item => item.id === params.interviewID);
         
          if (filteredFeedback.length > 0) {
            setFeedbackList(filteredFeedback);
            console.log("Filtered Feedback List Set:", filteredFeedback);
          } else {
            setError("No feedback data found for this interview "); // Handle case when no matching data is found
          }
        } else {
          setError("No feedback data available"); // Handle case when data is empty
        }
      } catch (error) {
        setError("Error fetching data: " + error.message); // Handle any errors during fetch
      }
    };

    GetFeedback(); // Fetch feedback data on component mount
  }, [params.interviewID]); // Add params.interviewID to dependency array

  return (
    <div className='p-4 md:p-10'>
      {/* Heading section */}
      <h2 className='text-2xl md:text-3xl font-bold text-green-500'>Congratulations!</h2>
      <h2 className='text-xl md:text-2xl font-bold'>Here is Your Interview Feedback</h2>
      <p className='text-xs md:text-sm text-gray-500 mb-5'>
        Find below interview questions with the correct answer, your answer, and feedback for improvement
      </p>

      {/* Feedback list section */}
      <div className='space-y-4'>
        {feedbackList.map((feedback) => (
          <Collapsible key={feedback.id} className="w-full">
            {/* Trigger section for each feedback item */}
            <CollapsibleTrigger 
              className="w-full px-4 py-2 flex justify-between text-left text-base md:text-lg font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition-all"
            >
              {feedback.question}
              <ChevronDownCircle className="h-6 w-6 hover:text-green-500"></ChevronDownCircle>
            </CollapsibleTrigger>

            {/* Content section that reveals feedback details */}
            <CollapsibleContent>
              <div className="flex flex-col gap-2">
                {/* Feedback rating */}
                <h2 className='text-yellow-800 text-base p-2 md:text-lg my-2 border rounded-lg bg-yellow-50'>
                  Your Overall Interview rating: <strong>{feedback.rating}/5</strong>
                </h2>
                
                {/* Feedback details */}
                <h2 className="text-sm md:text-xm text-blue-800 mb-2 bg-blue-50 border rounded-lg p-2">
                  <strong>Feedback:</strong> {feedback.feedback}
                </h2>

                <h2 className="text-sm md:text-sm text-red-800 mb-2 bg-red-50 border rounded-lg p-2">
                  <strong>Your Answer:</strong> {feedback.userAnswer}
                </h2>
                
                <h2 className="text-sm md:text-sm text-green-800 bg-green-50 border rounded-lg p-2">
                  <strong>Correct Answer:</strong> {feedback.correctAnswer}
                </h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>

      {/* Display error message if any */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* Button to navigate home */}
      <button onClick={() => router.replace('/dashboard')} className='mt-5 px-4 py-2 md:px-6 md:py-2 bg-indigo-600 text-white rounded-md text-sm md:text-base'>
        Go Home
      </button>
    </div>
  );
}

export default Feedback;
