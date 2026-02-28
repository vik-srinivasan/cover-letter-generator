export default function Header() {
  return (
    <header className="pt-16 pb-10 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-zinc-400 mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Powered by Claude
      </div>
      <h1 className="text-5xl font-bold tracking-tight">
        <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
          Cover letters
        </span>
        <br />
        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          worth reading.
        </span>
      </h1>
      <p className="mt-4 text-base text-zinc-500 max-w-sm mx-auto leading-relaxed">
        Paste a job posting, upload your resume, get a tailored cover letter in seconds.
      </p>
    </header>
  );
}
