"use client"
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import AnswerSection from "./_components/AnswerSection";
import RecordAnsSection from "./_components/RecordAnsSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StartInterview({ params }) {
  const [interviewDetails, setInterviewDetails] = useState(null);
  const [interviewId, setInterviewId] = useState(null);
  const [interviewData, setInterviewData] = useState([]); // State to hold the interview questions and answers
  const [visibleAnswerIndex, setVisibleAnswerIndex] = useState(null); // State to track which answer is currently visible
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [error, setError] = useState(""); // State to track any errors
  const [userAnswer, setUserAnswer] = useState(''); // Add state to hold user answer

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/posts");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const matchingDetail = data.find((item) => item.id === params.interviewID);

        if (matchingDetail) {
          setInterviewDetails(matchingDetail);
          setInterviewId(matchingDetail.id);
          console.log(matchingDetail.id);

          // Parse jsonmockresp and set interviewData
          if (matchingDetail.jsonmockresp) {
            const parsedData = JSON.parse(matchingDetail.jsonmockresp);
            setInterviewData(parsedData);
          } else {
            setError("No interview data found.");
          }
        } else {
          setError("No interview details found.");
        }
      } catch (error) {
        setError("Error fetching data: " + error.message);
      }
    };

    fetchData();
  }, [params.interviewID]); // Add params.interviewID to the dependency array

  const handleToggleAnswer = (index) => {
    setVisibleAnswerIndex(visibleAnswerIndex === index ? null : index);
  };

  return (
    <div>
      <h2 className="font-bold text-2xl ml-4 mb-4 mt-3 text-left">Start Interview</h2>

      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <QuestionSection
          interviewData={interviewData}
          userAnswer={userAnswer} // Pass userAnswer to QuestionSection
          handleToggleAnswer={handleToggleAnswer}
          activeQuestionIndex={activeQuestionIndex}
        />
        <div>
          <RecordAnsSection
            interviewData={interviewData}
            activeQuestionIndex={activeQuestionIndex}
            interviewId={interviewId} // Pass interviewId to RecordAnsSection
            setUserAnswer={setUserAnswer} // Pass setUserAnswer to RecordAnsSection
          />
          <AnswerSection
            interviewData={interviewData}
            visibleAnswerIndex={visibleAnswerIndex}
          />
        </div>
      </div>

      <div className="flex justify-end gap-5 mt-10">
        {activeQuestionIndex > 0 && (
          <Button
            className="bg-blue-900"
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            Previous Question
          </Button>
        )}
        {activeQuestionIndex < interviewData?.length - 1 && (
          <Button
            className="bg-blue-900"
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next Question
          </Button>
        )}
        {activeQuestionIndex === interviewData?.length - 1 && (
          <Link href={`/dashboard/interview/${params.interviewID}/feedback`}>
            <Button className="bg-blue-900">End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
