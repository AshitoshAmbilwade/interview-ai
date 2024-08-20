// AnswerSection.jsx
import React from "react";

const AnswerSection = ({ interviewData, visibleAnswerIndex }) => {
  return (
    <div>
      {interviewData.length > 0 && visibleAnswerIndex !== null && (
        <div className="mt-2">
          {/* Show the answer only if its index matches the visibleAnswerIndex */}
          <div className="p-2 bg-gray-100 rounded">
            {interviewData[visibleAnswerIndex]?.answer}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnswerSection;
