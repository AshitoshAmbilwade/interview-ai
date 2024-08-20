"use client";

import React, { useState } from "react";
import Script from "next/script";
import { useUser } from "@clerk/nextjs";
import PlanCard from "@/app/upgrade/PlanCard";

const Upgrade = () => {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null); // Track the selected plan
  const { user } = useUser(); // Clerk user object

  // Function to handle payment initiation
  const handlePayment = async (planAmount, planType) => {
    if (loading) return; // Prevent further processing if already loading

    setLoading(true); // Start loading for the selected plan
    setSelectedPlan(planType); // Track the selected plan

    try {
      // Convert amount to paise (integer)
      const amountInPaise = Math.round(planAmount * 100);

      // Request to create an order
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amountInPaise }), // Send amount in paise
      });

      const data = await response.json();

      if (!window.Razorpay) {
        throw new Error("Razorpay script not loaded");
      }

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Ensure this matches your environment variable
        amount: data.amount, // Amount in paise from API response
        currency: "INR",
        name: "Interviewer-AI",
        description: "Payment for your service",
        order_id: data.orderId, // Use the orderId from the API response
        handler: async function (response) {
          // Handle successful payment here
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
          const email = user?.primaryEmailAddress?.emailAddress; // Retrieve user email from Clerk
          const subscriptionType = planType;

          // Send payment details to backend for verification
          const verificationResponse = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
              email,
              subscriptionType,
            }),
          });

          const verificationData = await verificationResponse.json();
          if (verificationData.success) {
            alert("Payment Successful! Please refresh your dashboard.");
            // Optionally redirect or update UI
          } else {
            alert("Payment verification failed.");
          }
        },
        prefill: {
          
          email: user?.primaryEmailAddress?.emailAddress,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
      setSelectedPlan(null); // Reset selected plan after payment
    }
  };

  const monthlyPlanFeatures = [
    "10 Interviews",
    "Get More Personalized Feedback",
    "Email support",
    "Help center access",
  ];

  const yearlyPlanFeatures = [
    "200 Interviews",
    "Get More Personalized Feedback",
    "Email support",
    "Help center access",
  ];

  // Handle plan card click
  const handlePlanClick = (planAmount, planType) => {
    handlePayment(planAmount, planType);
  };

  return (
    <div className="p-10">
      <div className="flex flex-col items-center">
        <div className="flex flex-row gap-8 justify-center">
          <PlanCard
            title="Monthly Plan"
            price="100 INR"
            period="/month"
            features={monthlyPlanFeatures}
            onClick={() => handlePlanClick(100, "monthly")} // Pass amount and plan type
            loading={loading && selectedPlan === "monthly"} // Set loading based on selected plan
          />
          <PlanCard
            title="Yearly Plan"
            price="1500 INR"
            period="/year"
            features={yearlyPlanFeatures}
            onClick={() => handlePlanClick(1500, "yearly")} // Pass amount and plan type
            loading={loading && selectedPlan === "yearly"} // Set loading based on selected plan
          />
        </div>
      </div>

      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="beforeInteractive"
      />
    </div>
  );
};

export default Upgrade;
