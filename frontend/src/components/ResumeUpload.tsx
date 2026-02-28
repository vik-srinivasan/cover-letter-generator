"use client";

import { useCallback, useState } from "react";

interface Props {
  onSubmit: (resume: File, additionalDocs: File[]) => void;
  onBack: () => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function ResumeUpload({ onSubmit, onBack }: Props) {
  const [resume, setResume] = useState<File | null>(null);
  const [additionalDocs, setAdditionalDocs] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  function validateFile(file: File): string | null {
    if (file.type !== "application/pdf") return "Only PDF files are accepted";
    if (file.size > MAX_FILE_SIZE) return "File must be under 10MB";
    return null;
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const err = validateFile(file);
    if (err) { setError(err); return; }
    setError("");
    setResume(file);
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const err = validateFile(file);
    if (err) { setError(err); return; }
    setError("");
    setResume(file);
  }

  function handleAdditionalDocs(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    const invalid = files.find((f) => validateFile(f));
    if (invalid) { setError(validateFile(invalid)!); return; }
    setError("");
    setAdditionalDocs((prev) => [...prev, ...files]);
  }

  function removeAdditionalDoc(index: number) {
    setAdditionalDocs((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="animate-fade-in-up glass rounded-2xl p-7 gradient-border">
      <h2 className="text-base font-semibold text-zinc-200 mb-5">Resume</h2>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-10 text-center transition-all duration-300 ${
          dragActive
            ? "border-purple-500/50 bg-purple-500/5 scale-[1.02]"
            : resume
            ? "border-emerald-500/30 bg-emerald-500/5"
            : "border-zinc-800 hover:border-zinc-700 bg-zinc-900/30"
        }`}
      >
        {resume ? (
          <div className="animate-fade-in-up">
            <div className="text-3xl mb-3">&#10003;</div>
            <p className="text-sm font-semibold text-zinc-200">{resume.name}</p>
            <p className="text-xs text-zinc-500 mt-1">
              {(resume.size / 1024).toFixed(0)} KB
            </p>
            <button
              onClick={() => setResume(null)}
              className="mt-3 text-xs font-medium text-zinc-600 hover:text-rose-400 transition-colors"
            >
              remove
            </button>
          </div>
        ) : (
          <div>
            <div className="text-4xl mb-4 opacity-40">&#8593;</div>
            <p className="text-sm text-zinc-400">
              Drop your resume here, or{" "}
              <label className="text-purple-400 font-semibold cursor-pointer hover:text-purple-300 transition-colors">
                browse
                <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
              </label>
            </p>
            <p className="text-xs text-zinc-600 mt-2">PDF, up to 10MB</p>
          </div>
        )}
      </div>

      <div className="mt-5">
        <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-zinc-800 text-xs font-medium text-zinc-500 cursor-pointer hover:border-zinc-700 hover:text-zinc-400 transition-all">
          + Add supporting docs
          <input type="file" accept=".pdf" multiple onChange={handleAdditionalDocs} className="hidden" />
        </label>
        {additionalDocs.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {additionalDocs.map((doc, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-medium text-zinc-400"
              >
                {doc.name}
                <button onClick={() => removeAdditionalDoc(i)} className="text-zinc-600 hover:text-rose-400 transition-colors">
                  &times;
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className="mt-3 flex items-center gap-2 text-sm text-rose-400">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          {error}
        </div>
      )}

      <div className="mt-7 flex gap-3">
        <button
          onClick={onBack}
          className="px-5 py-2.5 border border-zinc-800 text-zinc-400 font-medium rounded-xl hover:bg-zinc-900 hover:text-zinc-300 transition-all text-sm"
        >
          Back
        </button>
        <button
          onClick={() => resume && onSubmit(resume, additionalDocs)}
          disabled={!resume}
          className="btn-glow flex-1 py-2.5 text-white font-semibold rounded-xl text-sm"
        >
          Generate
        </button>
      </div>
    </div>
  );
}
