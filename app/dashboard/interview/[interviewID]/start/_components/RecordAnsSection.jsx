"use client";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { Button } from "@/components/ui/button";

function RecordAnsSection({ interviewData, activeQuestionIndex, interviewId }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [postId, setPostId] = useState(null);
  const [useTextInput, setUseTextInput] = useState(false);

  const {
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Clear the results before each new recording
  useEffect(() => {
    if (isRecording) {
      setResults([]); // Clear previous results to avoid repetition
    }
  }, [isRecording, setResults]);

  useEffect(() => {
    if (results.length > 0) {
      const currentResults = results.map(result => result.transcript).join(' ');
      setUserAnswer(prevAnswer => {
        // Add debounce mechanism to avoid repetitions
        if (prevAnswer.trim() === currentResults.trim()) {
          return prevAnswer; // Skip adding the same result multiple times
        }
        return currentResults;
      });
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer && !useTextInput) {
      getFeedback();
    }
  }, [isRecording, userAnswer, useTextInput]);

  const handleRecording = () => {
    if (isRecording) {
      stopSpeechToText();
      setIsRecording(false);
    } else {
      setUserAnswer(''); // Clear the previous answer
      setResults([]); // Clear results to start fresh
      startSpeechToText();
      setIsRecording(true);
    }
  };

  const handleTextSubmit = () => {
    if (userAnswer.trim()) {
      getFeedback();
    }
  };

  const getFeedback = async () => {
    const currentQuestion = interviewData[activeQuestionIndex];
    setPostId(currentQuestion?.id);

    const feedbackPrompt = `question:${currentQuestion?.question} userAnswer:${userAnswer}, Depends on question and user answer. Please give us a rating 1 to 5 for the answer and feedback as an area of improvement if any with example, in JSON format with 'rating' and 'feedback' fields only. Do not add additional text.`;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = result.response.text().replace("```json", "").replace("```", "");
      const JsonFeedbackResp = JSON.parse(mockJsonResp);

      const feedbackData = {
        id: interviewId,
        question: currentQuestion.question,
        correctAnswer: currentQuestion.answer,
        userAnswer: userAnswer,
        postId: interviewId,
        rating: JsonFeedbackResp?.rating,
        feedback: JsonFeedbackResp?.feedback,
      };

      const response = await fetch('/api/feedbacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        toast.success('Successfully saved answer');
        setUserAnswer('');
        setResults([]);
      } else {
        toast.error('Failed to save answer');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error processing response');
    }
  };

  return (
    <div className="flex flex-col p-4 space-y-4 overflow-auto">
      {useTextInput ? (
        <div className="flex flex-col items-center space-y-4 flex-grow">
          <textarea
            className="w-full max-w-md p-3 border rounded-lg border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Enter your answer here..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onPaste={(e) => e.preventDefault()}  // Disable pasting
            onCopy={(e) => e.preventDefault()}   // Disable copying
            rows={6}
          />
          <Button onClick={handleTextSubmit} variant='outline' className='w-full max-w-md'>
            Submit Answer
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4 flex-grow">
          <div className="relative flex flex-col items-center bg-black rounded-lg p-5">
            <img
              src="/webcam.png"
              width={200}
              height={200}
              className="absolute opacity-30"
              alt="Webcam Image"
            />
            <Webcam
              mirrored={true}
              style={{
                height: 300,
                width: "100%",
                zIndex: 10,
                borderRadius: '8px',
              }}
            />
          </div>

          <Button onClick={handleRecording} variant='outline' className='w-full max-w-md'>
            {isRecording ? (
              <h2 className="text-red-800 flex gap-2 items-center">
                <Mic /> Stop Recording
              </h2>
            ) : (
              "Record Answer"
            )}
          </Button>
        </div>
      )}

      <Button
        onClick={() => setUseTextInput(!useTextInput)}
        variant='outline'
        className='w-full max-w-md'
      >
        {useTextInput ? "Switch to Voice Recording" : "Switch to Text Input"}
      </Button>
    </div>
  );
}

export default RecordAnsSection;
