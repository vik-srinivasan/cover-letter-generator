"use client";

import { useState } from "react";
import { downloadAsPdf } from "@/lib/pdf";

interface Props {
  letter: string;
  onStartOver: () => void;
}

export default function CoverLetterView({ letter, onStartOver }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Cover Letter</h2>

      <div className="prose prose-sm max-w-none mb-6">
        {letter.split("\n").map((line, i) => (
          <p key={i} className={line.trim() === "" ? "h-2" : "text-gray-700 leading-relaxed"}>
            {line}
          </p>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {copied ? "Copied!" : "Copy to Clipboard"}
        </button>
        <button
          onClick={() => downloadAsPdf(letter)}
          className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          Download PDF
        </button>
        <button
          onClick={onStartOver}
          className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}
