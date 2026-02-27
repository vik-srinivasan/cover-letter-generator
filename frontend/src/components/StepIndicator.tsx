import { Step } from "@/types";

const steps = [
  { num: 1 as const, label: "Job" },
  { num: 2 as const, label: "Resume" },
  { num: 3 as const, label: "Magic" },
];

export default function StepIndicator({ currentStep }: { currentStep: Step }) {
  return (
    <div className="flex items-center justify-center mb-10 gap-1">
      {steps.map((step, i) => {
        const isComplete = currentStep > step.num;
        const isActive = currentStep === step.num;
        const isPending = currentStep < step.num;

        return (
          <div key={step.num} className="flex items-center gap-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                  isComplete
                    ? "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                    : isActive
                    ? "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 ring-2 ring-purple-400/20 ring-offset-2 ring-offset-zinc-950"
                    : "bg-zinc-900 text-zinc-600 border border-zinc-800"
                }`}
              >
                {isComplete ? (
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.num
                )}
              </div>
              <span
                className={`mt-2 text-[11px] font-semibold uppercase tracking-wider transition-colors duration-300 ${
                  isPending ? "text-zinc-700" : isActive ? "text-purple-400" : "text-emerald-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="relative w-16 h-px mx-2 mb-6 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-400 to-purple-400 rounded-full transition-all duration-700 ease-out ${
                    isComplete ? "w-full" : "w-0"
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
