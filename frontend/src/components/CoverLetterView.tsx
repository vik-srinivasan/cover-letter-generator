"use client";

import { useState } from "react";
import { downloadAsPdf } from "@/lib/pdf";
import Confetti from "./Confetti";

interface Props {
  letter: string;
  onStartOver: () => void;
  showConfetti: boolean;
}

export default function CoverLetterView({ letter, onStartOver, showConfetti }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      {showConfetti && <Confetti />}
      <div className="animate-fade-in-up glass-bright rounded-2xl p-7">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
            </svg>
          </div>
          <h2 className="text-base font-semibold text-zinc-200">Here&apos;s your cover letter</h2>
        </div>

        <div className="bg-zinc-950/50 rounded-xl border border-zinc-800/50 p-6 mb-6">
          <div className="space-y-4">
            {letter.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-[13px] text-zinc-300 leading-[1.8]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
              copied
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "btn-glow text-white"
            }`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={() => downloadAsPdf(letter)}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-zinc-800 text-zinc-400 text-sm font-medium rounded-xl hover:bg-zinc-900 hover:text-zinc-300 transition-all"
          >
            Download PDF
          </button>
          <button
            onClick={onStartOver}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-zinc-800 text-zinc-400 text-sm font-medium rounded-xl hover:bg-zinc-900 hover:text-zinc-300 transition-all"
          >
            Start over
          </button>
        </div>
      </div>
    </>
  );
}
