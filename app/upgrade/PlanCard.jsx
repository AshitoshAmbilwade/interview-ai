// PlanCard.jsx
import React from "react";

const PlanCard = ({ title, price, period, features, onClick, loading }) => {
  return (
    <div className="rounded-2xl border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12">
      <div className="text-center">
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        <p className="mt-2 sm:mt-4">
          <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {price}
          </strong>
          <span className="text-sm font-medium text-gray-700"> {period}</span>
        </p>
      </div>
      <ul className="mt-6 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-indigo-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            <span className="text-gray-700"> {feature} </span>
          </li>
        ))}
      </ul>
      <button
        onClick={onClick}
        className="mt-8 block rounded-full border border-indigo-600 bg-white px-12 py-3 text-center text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
        disabled={loading}
      >
        {loading ? "Processing..." : "Get Started"}
      </button>
    </div>
  );
};

export default PlanCard;
