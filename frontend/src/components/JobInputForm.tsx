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
      setMode("paste"); // Switch to paste mode so user can edit
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Description</h2>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode("paste")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            mode === "paste"
              ? "bg-indigo-100 text-indigo-700"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          Paste Text
        </button>
        <button
          onClick={() => setMode("url")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            mode === "url"
              ? "bg-indigo-100 text-indigo-700"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
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
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            onClick={handleFetchUrl}
            disabled={loading || !url.trim()}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Fetching..." : "Fetch"}
          </button>
        </div>
      )}

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste the full job description here..."
        rows={10}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <button
        onClick={handleSubmit}
        className="mt-4 w-full py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Continue
      </button>
    </div>
  );
}
