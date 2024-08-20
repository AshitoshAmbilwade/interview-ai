import { NextResponse } from "next/server";
import connect from "@/db";
import Post from "@/models/Post";

// Handle POST request to save interview data to MongoDB
export const POST = async (request) => {
  try {
    await connect();

    const { id, jsonmockresp, jobposition, jobDescription, jobExperience, createdBy } = await request.json();

    const newPost = new Post({
      id,
      jsonmockresp,
      jobposition,
      jobDescription,
      jobExperience,
      createdBy,
    });

    await newPost.save();

    return NextResponse.json({ success: true, data: newPost }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error saving interview data: " + error.message }, { status: 500 });
  }
};

// Handle GET request to retrieve all posts from the MongoDB database
export const GET = async () => {
  try {
    await connect();

    const posts = await Post.find();

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error in fetching posts: " + error.message }, { status: 500 });
  }
};

// Handle DELETE request to delete a post by id
export const DELETE = async (request) => {
  try {
    await connect();

    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const result = await Post.findOneAndDelete({ id });

    if (!result) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Post deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting post: " + error.message }, { status: 500 });
  }
};
