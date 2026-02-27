"use client";

import { useCallback, useState } from "react";

interface Props {
  onSubmit: (resume: File, additionalDocs: File[]) => void;
  onBack: () => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

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
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setResume(file);
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const err = validateFile(file);
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setResume(file);
  }

  function handleAdditionalDocs(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    const invalid = files.find((f) => validateFile(f));
    if (invalid) {
      setError(validateFile(invalid)!);
      return;
    }
    setError("");
    setAdditionalDocs((prev) => [...prev, ...files]);
  }

  function removeAdditionalDoc(index: number) {
    setAdditionalDocs((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Resume</h2>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? "border-indigo-500 bg-indigo-50"
            : resume
            ? "border-green-300 bg-green-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
      >
        {resume ? (
          <div>
            <svg className="w-8 h-8 mx-auto text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-sm font-medium text-gray-900">{resume.name}</p>
            <p className="text-xs text-gray-500 mt-1">
              {(resume.size / 1024).toFixed(0)} KB
            </p>
            <button
              onClick={() => setResume(null)}
              className="mt-2 text-xs text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ) : (
          <div>
            <svg className="w-10 h-10 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm text-gray-600">
              Drag and drop your resume PDF here, or{" "}
              <label className="text-indigo-600 font-medium cursor-pointer hover:text-indigo-700">
                browse
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </p>
            <p className="text-xs text-gray-400 mt-1">PDF only, up to 10MB</p>
          </div>
        )}
      </div>

      {/* Additional docs */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Additional documents (optional)
        </label>
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={handleAdditionalDocs}
          className="text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />
        {additionalDocs.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {additionalDocs.map((doc, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 rounded-full text-xs text-gray-700"
              >
                {doc.name}
                <button onClick={() => removeAdditionalDoc(i)} className="text-gray-400 hover:text-red-500">
                  &times;
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <div className="mt-6 flex gap-3">
        <button
          onClick={onBack}
          className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => resume && onSubmit(resume, additionalDocs)}
          disabled={!resume}
          className="flex-1 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Generate Cover Letter
        </button>
      </div>
    </div>
  );
}
