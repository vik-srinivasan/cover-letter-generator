"use client";

import { useState } from "react";
import { scrapeUrl } from "@/lib/api";

interface Props {
  onSubmit: (text: string) => void;
}

export default function JobInputForm({ onSubmit }: Props) {
  const [mode, setMode] = useState<"paste" | "url">("paste");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleFetchUrl() {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    try {
      const result = await scrapeUrl(url.trim());
      setText(result.text);
      setMode("paste");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch URL");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit() {
    if (text.trim().length < 20) {
      setError("Please provide a more detailed job description");
      return;
    }
    setError("");
    onSubmit(text.trim());
  }

  return (
    <div className="animate-fade-in-up bg-white rounded-2xl shadow-sm shadow-slate-200/50 border border-slate-200/60 p-7">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
          <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-slate-900">Job Description</h2>
      </div>

      <div className="inline-flex rounded-lg bg-slate-100 p-0.5 mb-5">
        <button
          onClick={() => setMode("paste")}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
            mode === "paste"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Paste Text
        </button>
        <button
          onClick={() => setMode("url")}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
            mode === "url"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          From URL
        </button>
      </div>

      {mode === "url" && (
        <div className="flex gap-2 mb-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/job-posting"
            className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50/50 focus:bg-white focus:border-indigo-300 transition-colors"
          />
          <button
            onClick={handleFetchUrl}
            disabled={loading || !url.trim()}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-medium rounded-xl hover:from-indigo-600 hover:to-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm shadow-indigo-200"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                  <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                </svg>
                Fetching
              </span>
            ) : (
              "Fetch"
            )}
          </button>
        </div>
      )}

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste the full job description here..."
        rows={10}
        className="w-full px-4 py-3.5 border border-slate-200 rounded-xl text-sm leading-relaxed bg-slate-50/50 focus:bg-white focus:border-indigo-300 resize-y transition-colors placeholder:text-slate-400"
      />

      {error && (
        <div className="mt-3 flex items-center gap-2 text-sm text-red-600">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!text.trim()}
        className="mt-5 w-full py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium rounded-xl hover:from-indigo-600 hover:to-violet-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm shadow-indigo-200 active:scale-[0.99]"
      >
        Continue
      </button>
    </div>
  );
}
