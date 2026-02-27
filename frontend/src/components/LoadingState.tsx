export default function LoadingState() {
  return (
    <div className="animate-fade-in-up bg-white rounded-2xl shadow-sm shadow-slate-200/50 border border-slate-200/60 p-7">
      <div className="flex items-center gap-3 mb-8">
        <div className="relative w-5 h-5">
          <div className="absolute inset-0 rounded-full border-2 border-indigo-200" />
          <div className="absolute inset-0 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
        </div>
        <p className="text-sm font-medium text-indigo-600">Writing your cover letter...</p>
      </div>
      <div className="space-y-3.5">
        <div className="h-3.5 animate-shimmer rounded-full w-3/4" />
        <div className="h-3.5 animate-shimmer rounded-full w-full" style={{ animationDelay: "0.1s" }} />
        <div className="h-3.5 animate-shimmer rounded-full w-5/6" style={{ animationDelay: "0.2s" }} />
        <div className="h-3.5 animate-shimmer rounded-full w-full" style={{ animationDelay: "0.3s" }} />
        <div className="h-3.5 animate-shimmer rounded-full w-2/3" style={{ animationDelay: "0.4s" }} />
        <div className="h-6" />
        <div className="h-3.5 animate-shimmer rounded-full w-full" style={{ animationDelay: "0.5s" }} />
        <div className="h-3.5 animate-shimmer rounded-full w-4/5" style={{ animationDelay: "0.6s" }} />
        <div className="h-3.5 animate-shimmer rounded-full w-full" style={{ animationDelay: "0.7s" }} />
        <div className="h-3.5 animate-shimmer rounded-full w-3/4" style={{ animationDelay: "0.8s" }} />
      </div>
    </div>
  );
}
