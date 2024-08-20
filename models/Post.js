import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
 id:{
  type:String,
  required:true,
 },
  jsonmockresp: {
    type: String,
    required: true,
    trim: true, // Removes whitespace from both ends of the string
  },
  jobposition: {
    type: String,
    required: true,
    trim: true,
  },
  jobDescription: {
    type: String,
    required: true,
    trim: true,
  },
  jobExperience: {
    type: String,
    required: true,
    trim: true,
  },
  createdBy: {
    type: String,
    trim: true,
  },

}, {
  timestamps: true, // Adds createdAt and updatedAt fields automatically
});

export default mongoose.models.Post || mongoose.model("Post", postSchema);
