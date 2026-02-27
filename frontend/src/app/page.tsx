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
    <main className="min-h-screen pb-16">
      <div className="max-w-3xl mx-auto px-4">
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
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
                <button
                  onClick={handleStartOver}
                  className="mt-2 text-sm text-red-600 font-medium hover:text-red-700"
                >
                  Start Over
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
