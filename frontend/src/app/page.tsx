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
  const [showConfetti, setShowConfetti] = useState(false);

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
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3500);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
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
      setError(e instanceof Error ? e.message : "Revision failed");
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
    setShowConfetti(false);
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
                  showConfetti={showConfetti}
                />
                <FeedbackPanel
                  onSubmitFeedback={handleFeedback}
                  loading={loading}
                />
              </>
            ) : null}

            {error && (
              <div className="animate-fade-in-up mt-4 p-5 glass rounded-2xl border-rose-500/20">
                <div className="flex items-start gap-3">
                  <span className="text-rose-400">&#9888;</span>
                  <div>
                    <p className="text-sm font-medium text-rose-300">{error}</p>
                    <button
                      onClick={handleStartOver}
                      className="mt-2 text-sm font-medium text-rose-400 hover:text-rose-300 transition-colors"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <footer className="mt-16 text-center">
          <p className="text-xs text-zinc-700">
            Built with Claude &middot; Your data is never stored
          </p>
        </footer>
      </div>
    </main>
  );
}
