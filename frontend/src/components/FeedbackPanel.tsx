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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Want changes?</h3>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="e.g., Make it more concise, emphasize my leadership experience, change the tone to be more formal..."
        rows={3}
        disabled={loading}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50"
      />
      <button
        onClick={handleSubmit}
        disabled={!feedback.trim() || loading}
        className="mt-3 px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "Revising..." : "Revise Letter"}
      </button>
    </div>
  );
}
