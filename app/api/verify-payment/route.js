import mongoose from 'mongoose';
import connect from '@/db';
import Payment from '@/models/Payment'; // Adjust the path as needed
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Create an instance of Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Handle POST request for verifying payment and saving details
export async function POST(req) {
  try {
    await connect(); // Ensure MongoDB connection

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, subscriptionType } = await req.json();

    // Verify payment with Razorpay
    const isValidSignature = razorpay.utils.verifyPaymentSignature({
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
      signature: razorpay_signature,
    });

    if (isValidSignature) {
      // Save payment details to the database
      const newPayment = new Payment({
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        subscriptionType,
      });

      await newPayment.save();

      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: 'Signature verification failed' }, { status: 400 });
    }
  } catch (error) {
    console.error("Payment verification failed:", error);
    return NextResponse.json({ success: false, message: 'Payment verification failed: ' + error.message }, { status: 500 });
  }
}

// Handle GET request to retrieve payment details based on order_id
export async function GET(req) {
  try {
    await connect(); // Ensure MongoDB connection

    const url = new URL(req.url);
    const order_id = url.searchParams.get('order_id');

    if (!order_id) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    // Fetch payments related to the specified order_id
    const payments = await Payment.find({ razorpay_order_id: order_id });

    return NextResponse.json(payments, { status: 200 });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json({ error: 'Error fetching payments: ' + error.message }, { status: 500 });
  }
}
