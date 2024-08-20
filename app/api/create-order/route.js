import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Initialize Razorpay with your credentials
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    // Parse the JSON body of the request
    const { amount } = await req.json(); // Amount should already be in paise

    // Create an order with Razorpay
    const order = await razorpay.orders.create({
      amount, // Amount in paise
      currency: 'INR',
      receipt: `receipt_${Math.random().toString(36).substring(7)}`,
    });

    // Return the order details as JSON response
    return NextResponse.json({
      orderId: order.id,
      amount: order.amount, // Amount in paise
      currency: order.currency,
    }, { status: 200 });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
