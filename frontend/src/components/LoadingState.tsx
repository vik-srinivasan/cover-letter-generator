"use client";

import { useState, useEffect } from "react";

const messages = [
  "Reading your resume",
  "Analyzing the job posting",
  "Finding the perfect angle",
  "Crafting your story",
  "Polishing every sentence",
  "Almost there",
];

export default function LoadingState() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-fade-in-up glass rounded-2xl p-8 text-center">
      {/* Orbiting dots */}
      <div className="relative w-16 h-16 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full border border-zinc-800" />
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s" }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 shadow-lg shadow-purple-500/50" />
        </div>
        <div className="absolute inset-2 animate-spin" style={{ animationDuration: "2s", animationDirection: "reverse" }}>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 shadow-lg shadow-pink-500/50" />
        </div>
        <div className="absolute inset-4 animate-spin" style={{ animationDuration: "4s" }}>
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 shadow-lg shadow-cyan-500/50" />
        </div>
      </div>

      <p className="text-sm font-medium text-zinc-300 cursor-blink" key={msgIndex}>
        {messages[msgIndex]}
      </p>
      <p className="text-xs text-zinc-600 mt-2">This usually takes 5-10 seconds</p>

      <div className="mt-8 space-y-3 text-left">
        <div className="h-3 animate-shimmer rounded-full w-3/4" />
        <div className="h-3 animate-shimmer rounded-full w-full" style={{ animationDelay: "0.1s" }} />
        <div className="h-3 animate-shimmer rounded-full w-5/6" style={{ animationDelay: "0.2s" }} />
        <div className="h-3 animate-shimmer rounded-full w-2/3" style={{ animationDelay: "0.3s" }} />
      </div>
    </div>
  );
}
