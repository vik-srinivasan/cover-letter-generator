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
      setError("Need a bit more detail than that");
      return;
    }
    setError("");
    onSubmit(text.trim());
  }

  return (
    <div className="animate-fade-in-up glass rounded-2xl p-7 gradient-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-semibold text-zinc-200">The gig</h2>
        <div className="inline-flex rounded-lg bg-zinc-900/80 border border-zinc-800 p-0.5">
          <button
            onClick={() => setMode("paste")}
            className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
              mode === "paste"
                ? "bg-zinc-800 text-zinc-100 shadow-sm"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Paste
          </button>
          <button
            onClick={() => setMode("url")}
            className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
              mode === "url"
                ? "bg-zinc-800 text-zinc-100 shadow-sm"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            URL
          </button>
        </div>
      </div>

      {mode === "url" && (
        <div className="flex gap-2 mb-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://jobs.example.com/..."
            className="flex-1 px-4 py-2.5 bg-zinc-900/50 border border-zinc-800 rounded-xl text-sm text-zinc-200 placeholder:text-zinc-600 transition-all"
          />
          <button
            onClick={handleFetchUrl}
            disabled={loading || !url.trim()}
            className="btn-glow px-5 py-2.5 text-white text-sm font-medium rounded-xl disabled:opacity-30"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                  <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                </svg>
                Grabbing
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
        placeholder="Paste the job description here..."
        rows={8}
        className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800 rounded-xl text-sm text-zinc-300 leading-relaxed resize-y transition-all placeholder:text-zinc-600"
      />

      {error && (
        <div className="mt-3 flex items-center gap-2 text-sm text-rose-400">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!text.trim()}
        className="btn-glow mt-5 w-full py-3 text-white font-semibold rounded-xl text-sm"
      >
        Next step
      </button>
    </div>
  );
}
