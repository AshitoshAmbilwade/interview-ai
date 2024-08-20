"use client";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { Button } from "@/components/ui/button";

function RecordAnsSection({ interviewData, activeQuestionIndex, interviewId }) {
  // State to hold the user's answer
  const [userAnswer, setUserAnswer] = useState('');
  // State to manage recording status
  const [isRecording, setIsRecording] = useState(false); // Default to mic off
  // State to store the ID of the current post
  const [postId, setPostId] = useState(null);
  // State to toggle between text input and recording
  const [useTextInput, setUseTextInput] = useState(false); // Default to recording mode

  // Hook for handling speech-to-text functionality
  const {
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Effect to update userAnswer when new speech-to-text results are available
  useEffect(() => {
    if (results.length > 0) {
      // Combine all results into a single string
      const currentResults = results.map(result => result.transcript).join(' ');
      // Update the userAnswer state
      setUserAnswer(currentResults);
    }
  }, [results]);

  // Effect to trigger feedback collection when recording stops and userAnswer is present
  useEffect(() => {
    if (!isRecording && userAnswer && !useTextInput) {
      getFeedback();
    }
  }, [isRecording, userAnswer, useTextInput]);

  // Function to handle the recording toggle
  const handleRecording = () => {
    if (isRecording) {
      // Stop recording if currently recording
      stopSpeechToText();
      setIsRecording(false);
    } else {
      // Clear the previous answer and start recording
      setUserAnswer('');
      startSpeechToText();
      setIsRecording(true);
    }
  };

  // Function to handle text submission
  const handleTextSubmit = () => {
    if (userAnswer.trim()) { // Ensure userAnswer is not empty
      getFeedback();
    }
  };

  // Function to collect feedback based on the user's answer
  const getFeedback = async () => {
    console.log("Interview ID:", interviewId);
    console.log("User's Answer:", userAnswer);

    // Get the current question based on the active index
    const currentQuestion = interviewData[activeQuestionIndex];
    setPostId(currentQuestion?.id);

    // Construct the feedback prompt
    const feedbackPrompt = `question:${currentQuestion?.question} userAnswer:${userAnswer}, Depends on question and user answer. Please give us a rating 1 to 5 for the answer and feedback as an area of improvement if any with example, in JSON format with 'rating' and 'feedback' fields only. Do not add additional text.`;

    try {
      // Send the prompt to the chatSession and get the response
      const result = await chatSession.sendMessage(feedbackPrompt);
      // Clean up and parse the JSON response
      const mockJsonResp = result.response.text().replace("```json", "").replace("```", "");
      const JsonFeedbackResp = JSON.parse(mockJsonResp);

      console.log('JSON Feedback Response:', JsonFeedbackResp);

      // Prepare the feedback data
      const feedbackData = {
        id: interviewId, // Use interviewId here
        question: currentQuestion.question,
        correctAnswer: currentQuestion.answer,
        userAnswer: userAnswer,
        postId: interviewId, // Use interviewId here as postId
        rating: JsonFeedbackResp?.rating,
        feedback: JsonFeedbackResp?.feedback,
      };

      // Send feedback data to the server
      const response = await fetch('/api/feedbacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        // Show success message and clear the userAnswer
        toast.success('Successfully saved answer');
        setUserAnswer(''); // Clear the userAnswer after saving
        setResults([]);
      } else {
        // Show error message if the response was not successful
        toast.error('Failed to save answer');
      }
      setResults([]);
    } catch (error) {
      // Handle errors during the process
      console.error('Error:', error);
      toast.error('Error processing response');
    }
  };

  return (
    <div className="flex flex-col  p-4 space-y-4 overflow-auto">
      {/* Render text input area if useTextInput is true */}
      {useTextInput ? (
        <div className="flex flex-col items-center space-y-4 flex-grow">
          <textarea
            className="w-full max-w-md p-3 border rounded-lg border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Enter your answer here..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            rows={6}
          />
          <Button onClick={handleTextSubmit} variant='outline' className='w-full max-w-md'>
            Submit Answer
          </Button>
        </div>
      ) : (
        // Render voice recording area if useTextInput is false
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

      {/* Toggle button to switch between text input and voice recording */}
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
