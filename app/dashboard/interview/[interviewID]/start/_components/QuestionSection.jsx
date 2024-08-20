import React from "react";
import { Lightbulb, Volume2 } from "lucide-react";

// The QuestionSection component receives several props: interviewData (array of questions),
// handleToggleAnswer (function to toggle the answer visibility), visibleAnswerIndex (index of the currently visible answer), 
// and activeQuestionIndex (index of the currently active question).

const QuestionSection = ({
  interviewData,
  handleToggleAnswer,
  activeQuestionIndex,
}) => {
  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert('Sorry, please use another browser for text-to-speech support.');
    }
  };

  return (
    <div className="p-5 border rounded-lg h-100">
      {/* Container for the grid layout of questions */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {interviewData.length > 0 ? (
          interviewData.map((item, index) => (
            <div key={index}>
              <div
                className={`p-3 border rounded-full cursor-pointer 
                  ${activeQuestionIndex === index ? 'bg-blue-700 text-white' : 'bg-white'}`}
                onClick={() => handleToggleAnswer(index)} // Handle question click
              >
                <h3 className="font-semibold text-xs md:text-sm text-center">
                  Question #{index + 1}
                </h3>
              </div>
            </div>
          ))
        ) : (
          <p>No interview questions found.</p>
        )}
      </div>

      {/* Display the active question and answer below the grid */}
      {interviewData.length > 0 && activeQuestionIndex !== null && (
        <div className="mt-5 flex flex-col items-start my-10">
          <h2 className="my-5 text-md md:text-lg">
            {interviewData[activeQuestionIndex].question}
          </h2>
          <Volume2
            className="pointer-cursor mb-5"
            onClick={() => textToSpeech(interviewData[activeQuestionIndex].question)}
          />
          <button
            onClick={() => handleToggleAnswer(activeQuestionIndex)}
            className="mt-2 px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-500"
          >
            Show Answer
          </button>
        </div>
      )}

      {/* Information card providing guidance on the mock interview process */}
      <div className="flex-grow bg-blue-100 border-t-4 border-blue-500 rounded-lg p-5 text-blue-800 shadow-md">
        <div className="flex flex-col">
          <h2 className="flex gap-2 items-center text-blue-900">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="mt-3">{process.env.NEXT_PUBLIC_NOTE}</h2>
        </div>
      </div>
    </div>
  );
};

export default QuestionSection;
