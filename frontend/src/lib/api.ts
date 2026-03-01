import { GenerateResponse, ScrapeResponse } from "@/types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function scrapeUrl(url: string): Promise<ScrapeResponse> {
  const res = await fetch(`${API_BASE}/scrape-url`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Failed to scrape URL" }));
    throw new Error(err.detail || "Failed to scrape URL");
  }
  return res.json();
}

export async function generateCoverLetter(
  jobDescription: string,
  resumeFile: File,
  additionalDocs: File[] = [],
  previousLetter?: string,
  feedback?: string
): Promise<GenerateResponse> {
  const formData = new FormData();
  formData.append("job_description", jobDescription);
  formData.append("resume", resumeFile);
  additionalDocs.forEach((doc) => formData.append("additional_docs", doc));
  if (previousLetter) formData.append("previous_letter", previousLetter);
  if (feedback) formData.append("feedback", feedback);

  const res = await fetch(`${API_BASE}/generate`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Generation failed" }));
    throw new Error(err.detail || "Generation failed");
  }
  return res.json();
}
