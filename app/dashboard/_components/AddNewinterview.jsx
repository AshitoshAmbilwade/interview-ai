"use client"; // Enables the use of React hooks and state in a client-side component

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState(""); 
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser(); 
  const router = useRouter();

  const onSubmit = async (event) => {
    setLoading(true); // Start the loading spinner
    event.preventDefault(); // Prevent the default form submission behavior
    console.log(jobPosition, jobDescription, jobExperience); // Log the current form values to the console
  
    // Construct the prompt to send to the AI model
    const InputPrompt =
      "Job position: " +
      jobPosition +
      ", job description: " +
      jobDescription +
      " , years of experience: " +
      jobExperience +
      " , depends on this information please give us 10 most frequently commonly ask questions by HR with their suitable perfect answers in JSON format give questions and answers as field in Json . answer should be json only and write only answers in json";
  
    // Send the constructed prompt to the AI model and get the response
    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResp = (await result.response.text()) // Extract and clean the response
      .replace("```json", "")
      .replace("```", "");
  
    console.log(JSON.parse(MockJsonResp)); // Log the cleaned JSON response to the console
    setJsonResponse(MockJsonResp); // Store the JSON response in the state
  
    // Generate a random ID for the entry
    const generatedId = Math.random().toString(36).substring(2, 15);
  
    // Prepare the data object to be saved to the database
    const postData = {
      id: generatedId, // Use the generated ID
      jsonmockresp: MockJsonResp, // Store the AI-generated response
      jobposition: jobPosition, // Store the job position
      jobDescription: jobDescription, // Store the job description
      jobExperience: jobExperience, // Store the job experience
      createdBy: user?.primaryEmailAddress?.emailAddress, // Replace with the actual user ID if available
    };
  
    try {
      const saveResponse = await fetch("/api/posts", {
        method: "POST", // Specify the HTTP method as POST
        headers: {
          "Content-Type": "application/json", // Set the content type as JSON
        },
        body: JSON.stringify(postData), // Convert the data object to a JSON string for sending
      });
  
      const data = await saveResponse.json(); // Parse the response from the server
      console.log("Data saved successfully:", data); // Log success message with returned data

      // Use the ID returned from the server (assuming it's part of the response)
      const id = data.id || generatedId; // Fallback to generatedId if server response doesn't include ID

      setLoading(false); // Stop the loading spinner
      setOpenDialog(false); // Close the dialog

      router.push(`/dashboard/interview/${id}`); // Redirect to the interview page with the interview ID
    } catch (error) {
      console.error("Error saving data:", error); // Log any errors that occur during the save process
      setLoading(false); // Stop the loading spinner in case of an error
    }
  };

  return (
    <div >
      <div
        className="p-10 border rounded-lg bg-secondary
        hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog} >
        <DialogContent className="max-w-full sm:max-w-xl p-4 sm:p-6 bg-white"> {/* Set the background to white */}
          <DialogHeader>
            <DialogTitle className="text-2xl sm:text-xl">
              Tell us about the role you're looking to fill
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div className="mb-4">
                  <h2 className="text-lg sm:text-sm">
                    Add all given details to get a customized interview
                  </h2>
                </div>

                <div className="mt-7 my-5">
                  <label> Job Role/Job Position</label>
                  <Input
                    className="mt-2 my-2 border border-black"  // Add black border to the input
                    placeholder="Ex. Full Stack Developer"
                    onChange={(event) => setJobPosition(event.target.value)}
                    required
                    value={jobPosition}
                  />
                </div>

                <div className="mt-7 my-5 ">
                  <label> Job Description/Tech Stack</label>
                  <Textarea
                    className="mt-2 my-2 border border-black" // Add black border to the textarea
                    placeholder="Ex. MongoDB, Expressjs, React js, Nodejs, Full stack etc"
                    onChange={(event) => setJobDescription(event.target.value)}
                    required
                    value={jobDescription}
                  />
                </div>

                <div className="mt-7 my-5">
                  <label> Years Of Experience</label>
                  <Input
                    className="mt-2 my-2 border border-black" // Add black border to the input
                    placeholder="Ex.Fresher-0"
                    type="number"
                    max="30"
                    onChange={(event) => setJobExperience(event.target.value)}
                    required
                    value={jobExperience}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Generating from AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
