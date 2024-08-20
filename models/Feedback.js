import mongoose from "mongoose";

const { Schema }= mongoose;


// Define the Feedback schema
const feedbackSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
    trim: true,
  },
  correctAnswer: {
    type: String,
    required: false,  // Optional if not all questions have a correct answer
    trim: true,
  },
  userAnswer: {
    type: String,
    required: true,
    trim: true,
  },
  postId: {
    type: String,
     // Ensure Post model exists and is correctly referenced
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  feedback: {
    type: String,
  
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Ensure the model is correctly exported and named
export default mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);
