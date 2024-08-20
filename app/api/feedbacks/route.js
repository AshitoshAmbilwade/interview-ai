import { NextResponse } from "next/server";
import connect from "@/db";
import Feedback from "@/models/Feedback";

// Handle POST request to save feedback data to MongoDB
export const POST = async (request) => {
  try {
    // Connect to the MongoDB database
    await connect();

    // Extract data from the incoming request
    const { id, question, correctAnswer, userAnswer, postId, rating, feedback } = await request.json();

    // Validate that all required fields are present
    if (!id || !question || !userAnswer || !postId || rating === undefined || !feedback) {
      console.error("Validation error: Missing required fields");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Log the feedback data before saving
    console.log('Attempting to save feedback:', { id, question, correctAnswer, userAnswer, postId, rating, feedback });

    // Create a new document using the Feedback model
    const newFeedback = new Feedback({
      id,
      question,
      correctAnswer,
      userAnswer,
      postId,
      rating,
      feedback,
    });

    // Save the document to the database
    await newFeedback.save();

    // Return a successful response with the saved data
    return NextResponse.json({ success: true, data: newFeedback }, { status: 201 });

  } catch (error) {
    // Log the error for debugging
    console.error("Error saving feedback data:", error);

    // Return an error response if something goes wrong
    return NextResponse.json({ error: `Error saving feedback data: ${error.message}` }, { status: 500 });
  }
};

// Handle GET request to retrieve all feedbacks from the MongoDB database
export const GET = async () => {
  try {
    // Connect to the MongoDB database
    await connect();

    // Retrieve all feedbacks from the Feedback collection
    const feedbacks = await Feedback.find();

    // Return the feedbacks as a JSON response
    return NextResponse.json({ success: true, data: feedbacks }, { status: 200 });

  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching feedback data:", error);

    // Return an error response if something goes wrong
    return NextResponse.json({ error: `Error fetching feedback data: ${error.message}` }, { status: 500 });
  }
};
