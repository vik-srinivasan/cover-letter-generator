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
    <div className="animate-fade-in-up bg-white rounded-2xl shadow-sm shadow-slate-200/50 border border-slate-200/60 p-7 mt-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
          <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-slate-900">Request changes</h3>
      </div>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="e.g., Make it shorter, emphasize my leadership experience, adjust the tone..."
        rows={3}
        disabled={loading}
        className="w-full px-4 py-3.5 border border-slate-200 rounded-xl text-sm leading-relaxed bg-slate-50/50 focus:bg-white focus:border-indigo-300 resize-y transition-colors placeholder:text-slate-400 disabled:opacity-50"
      />
      <button
        onClick={handleSubmit}
        disabled={!feedback.trim() || loading}
        className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-medium rounded-xl hover:from-indigo-600 hover:to-violet-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm shadow-indigo-200 active:scale-[0.98]"
      >
        {loading ? (
          <>
            <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
              <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
            </svg>
            Revising...
          </>
        ) : (
          "Revise Letter"
        )}
      </button>
    </div>
  );
}
