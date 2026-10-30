import { Loader2 } from 'lucide-react';

export const LoadingScreen = () => (
  <main
    className="flex min-h-dvh items-center justify-center bg-[#f8f9fa] px-5 text-[#0f0f0f]"
    role="status"
    aria-live="polite"
    aria-label="Loading Project Mate"
  >
    <div className="w-full max-w-sm border-2 border-[#0f0f0f] bg-white p-8 text-center shadow-[6px_6px_0_0_#0044ff]">
      <div className="mb-6 flex items-center justify-center gap-2 font-display text-xl font-black tracking-tight">
        <span
          className="h-3.5 w-3.5 rounded-full bg-[#0044ff]"
          aria-hidden="true"
        />
        PROJECT_MATE
      </div>
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border-2 border-[#0f0f0f] bg-[#eaf0ff] text-[#0044ff]">
        <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
      </div>
      <p className="font-display text-sm font-black uppercase tracking-wide">
        Getting things ready
      </p>
      <p className="mt-2 text-xs text-gray-500">
        Loading your open-source community.
      </p>
      <div className="mt-6 h-2 border border-[#0f0f0f] bg-gray-100">
        <div className="h-full w-1/3 animate-pulse bg-[#0044ff]" />
      </div>
    </div>
  </main>
);
