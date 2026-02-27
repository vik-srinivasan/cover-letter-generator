"use client";

import { useState } from "react";
import Header from "@/components/Header";
import StepIndicator from "@/components/StepIndicator";
import JobInputForm from "@/components/JobInputForm";
import ResumeUpload from "@/components/ResumeUpload";
import CoverLetterView from "@/components/CoverLetterView";
import FeedbackPanel from "@/components/FeedbackPanel";
import LoadingState from "@/components/LoadingState";
import { generateCoverLetter } from "@/lib/api";
import { Step } from "@/types";

export default function Home() {
  const [step, setStep] = useState<Step>(1);
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [additionalDocs, setAdditionalDocs] = useState<File[]>([]);
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleJobSubmit(text: string) {
    setJobDescription(text);
    setStep(2);
  }

  async function handleResumeSubmit(resume: File, docs: File[]) {
    setResumeFile(resume);
    setAdditionalDocs(docs);
    setStep(3);
    setLoading(true);
    setError("");
    try {
      const result = await generateCoverLetter(jobDescription, resume, docs);
      setCoverLetter(result.cover_letter);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate cover letter");
    } finally {
      setLoading(false);
    }
  }

  async function handleFeedback(feedback: string) {
    if (!resumeFile) return;
    setLoading(true);
    setError("");
    try {
      const result = await generateCoverLetter(
        jobDescription,
        resumeFile,
        additionalDocs,
        coverLetter,
        feedback
      );
      setCoverLetter(result.cover_letter);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to revise cover letter");
    } finally {
      setLoading(false);
    }
  }

  function handleStartOver() {
    setStep(1);
    setJobDescription("");
    setResumeFile(null);
    setAdditionalDocs([]);
    setCoverLetter("");
    setError("");
  }

  return (
    <main className="min-h-screen pb-20">
      <div className="max-w-2xl mx-auto px-5">
        <Header />
        <StepIndicator currentStep={step} />

        {step === 1 && <JobInputForm onSubmit={handleJobSubmit} />}

        {step === 2 && (
          <ResumeUpload
            onSubmit={handleResumeSubmit}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <>
            {loading && !coverLetter ? (
              <LoadingState />
            ) : coverLetter ? (
              <>
                <CoverLetterView
                  letter={coverLetter}
                  onStartOver={handleStartOver}
                />
                <FeedbackPanel
                  onSubmitFeedback={handleFeedback}
                  loading={loading}
                />
              </>
            ) : null}

            {error && (
              <div className="animate-fade-in-up mt-4 p-5 bg-red-50 border border-red-200/60 rounded-2xl">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-red-800">{error}</p>
                    <button
                      onClick={handleStartOver}
                      className="mt-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                    >
                      Start over
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
