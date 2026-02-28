"use client";

import { useState } from "react";

interface Props {
  onSubmitFeedback: (feedback: string) => void;
  loading: boolean;
}

export default function FeedbackPanel({ onSubmitFeedback, loading }: Props) {
  const [feedback, setFeedback] = useState("");

  function handleSubmit() {
    if (!feedback.trim()) return;
    onSubmitFeedback(feedback.trim());
    setFeedback("");
  }

  return (
    <div className="animate-fade-in-up glass rounded-2xl p-6 mt-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm">&#9998;</span>
        <h3 className="text-sm font-semibold text-zinc-300">Request changes</h3>
      </div>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="e.g., Make it shorter, emphasize leadership experience, adjust the tone..."
        rows={2}
        disabled={loading}
        className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-sm text-zinc-300 leading-relaxed resize-y transition-all placeholder:text-zinc-600 disabled:opacity-50"
      />
      <button
        onClick={handleSubmit}
        disabled={!feedback.trim() || loading}
        className="btn-glow mt-3 px-5 py-2.5 text-white text-sm font-semibold rounded-xl"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
              <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
            </svg>
            Revising
          </span>
        ) : (
          "Revise"
        )}
      </button>
    </div>
  );
}
