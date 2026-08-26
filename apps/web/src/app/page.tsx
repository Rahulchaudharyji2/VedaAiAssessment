"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import dynamic from "next/dynamic";
import { UploadView } from "@/components/UploadView";
import { LoadingView } from "@/components/LoadingView";

const ResultsView = dynamic(() => import("@/components/ResultsView").then(mod => mod.ResultsView), { ssr: false });

export type AppState = "upload" | "loading" | "results";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("upload");
  const [questionPaper, setQuestionPaper] = useState<File | null>(null);
  const [answerSheet, setAnswerSheet] = useState<File | null>(null);
  const [extractionData, setExtractionData] = useState<any>(null);

  const handleStartMapping = async () => {
    if (!questionPaper || !answerSheet) return;
    
    setAppState("loading");
    
    try {
      const formData = new FormData();
      formData.append("questionPaper", questionPaper);
      formData.append("answerSheet", answerSheet);

      // We'll mock the API call for now or implement the actual endpoint
      const response = await fetch("/api/process-assessment", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error("Failed to process files");
      }

      const data = await response.json();
      setExtractionData(data);
      setAppState("results");
    } catch (error) {
      console.error(error);
      alert("An error occurred during extraction. Please try again.");
      setAppState("upload");
    }
  };

  return (
    <>
      <Header />
      <div className="flex-1 bg-[#f3f4f6] md:bg-gradient-to-b md:from-gray-50 md:to-gray-200 m-0 md:m-2 md:ml-0 mt-0 md:rounded-3xl md:shadow-sm md:border md:border-gray-200 overflow-x-hidden overflow-y-auto relative">
        {appState === "upload" && (
          <UploadView 
            questionPaper={questionPaper}
            setQuestionPaper={setQuestionPaper}
            answerSheet={answerSheet}
            setAnswerSheet={setAnswerSheet}
            onStartMapping={handleStartMapping}
          />
        )}
        
        {appState === "loading" && <LoadingView />}
        
        {appState === "results" && (
          <ResultsView 
            data={extractionData} 
            answerSheetFile={answerSheet} 
          />
        )}
      </div>
    </>
  );
}
