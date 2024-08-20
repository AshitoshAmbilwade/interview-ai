"use client";

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs'; // Clerk for authentication
import { useRouter } from 'next/navigation';

function User() {
  const { isLoaded, isSignedIn, user } = useUser(); // Clerk user info
  const [subscription, setSubscription] = useState(null); // Store subscription type
  const [interviewsUsed, setInterviewsUsed] = useState(0); // Track interviews used
  const [limit, setLimit] = useState(0); // Interview limit based on subscription
  const router = useRouter(); // For redirecting

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // Function to fetch user details from your backend
      const fetchUserData = async () => {
        try {
          const email = user.primaryEmailAddress.emailAddress;
          const res = await fetch(`/api/user?email=${email}`);
          const data = await res.json();

          if (data.success) {
            setSubscription(data.data.subscriptionType);
            setInterviewsUsed(data.data.interviewsUsed);

            // Set interview limit based on subscription type
            switch (data.data.subscriptionType) {
              case 'free':
                setLimit(4);
                break;
              case 'monthly':
                setLimit(10);
                break;
              case 'yearly':
                setLimit(200);
                break;
              default:
                setLimit(0);
                break;
            }
          } else {
            console.error("User data not found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData(); // Fetch user data when the user is logged in
    }
  }, [isLoaded, isSignedIn, user]);

  // Handle Razorpay payment (for upgrading subscription)
  const handlePayment = async (subscriptionType) => {
    try {
      const email = user.primaryEmailAddress.emailAddress;
      const res = await fetch('/api/createorder', {
        method: 'POST',
        body: JSON.stringify({ subscriptionType, email }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();

      if (data.success) {
        const razorpayOptions = {
          key: 'NEXT_PUBLIC_RAZORPAY_KEY_ID', // Replace with Razorpay key
          amount: data.amount,
          currency: 'INR',
          name: 'Your App Name',
          description: `Subscription - ${subscriptionType}`,
          order_id: data.orderId,
          handler: async (response) => {
            const paymentVerification = await fetch('/api/verify-payment', {
              method: 'POST',
              body: JSON.stringify({ ...response, email }),
              headers: { 'Content-Type': 'application/json' }
            });

            const verificationData = await paymentVerification.json();
            if (verificationData.success) {
              alert("Payment successful!");
              fetchUserData(); // Refresh user data to reflect subscription change
            } else {
              alert("Payment verification failed!");
            }
          },
          prefill: {
            email,
            contact: '1234567890', // Add user’s phone number here
          },
          theme: {
            color: '#F37254'
          }
        };

        const razorpay = new window.Razorpay(razorpayOptions);
        razorpay.open();
      } else {
        alert("Payment initialization failed!");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  if (!isLoaded || !isSignedIn) {
    return <p>Loading...</p>; // Show loading state until data is ready
  }

  return (
    <div className="user-dashboard p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">User Dashboard</h1>

      <div className="mb-6">
        <p className="text-lg">Email: <span className="font-medium">{user.primaryEmailAddress.emailAddress}</span></p>
        <p className="text-lg">Subscription: <span className="font-medium">{subscription || 'Not Available'}</span></p>
        <p className="text-lg">Interviews Used: <span className="font-medium">{interviewsUsed}/{limit}</span></p>
      </div>

      {subscription === 'free' && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Upgrade Your Subscription</h2>
          <button
            onClick={() => handlePayment('monthly')}
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Upgrade to Monthly
          </button>
          <button
            onClick={() => handlePayment('yearly')}
            className="mt-2 ml-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
          >
            Upgrade to Yearly
          </button>
        </div>
      )}

      {interviewsUsed < limit ? (
        <button
          onClick={() => router.push('/start-interview')}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Start Interview
        </button>
      ) : (
        <p className="mt-4 text-red-500">You have reached your interview limit for the {subscription} plan.</p>
      )}
    </div>
  );
}

export default User;
