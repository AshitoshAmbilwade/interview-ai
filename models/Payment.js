import mongoose from "mongoose";

const { Schema } = mongoose;

const paymentSchema = new Schema({
  razorpay_payment_id: {
    type: String,
    required: true,
    unique: true, // Ensures that payment ID is unique
  },
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true, // Removes whitespace from both ends of the string
  },
  subscriptionType: {
    type: String,
    enum: ['monthly', 'yearly'], // Limits to specified subscription types
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields automatically
});

export default mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
