"use client";

const SUPPORT_URL = "https://sociabuzz.com/habiku";

export function SociabuzzSupportWidget() {
  return (
    <a
      href={SUPPORT_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Beri dukungan melalui Sociabuzz"
      className="fixed bottom-6 right-6 z-[9999999] inline-flex min-h-[47px] max-w-[220px] items-center justify-center rounded-full border border-[#76CC11] bg-[#76CC11] px-4 py-3 text-center text-sm font-extrabold leading-[140%] text-white shadow-xl shadow-black/20"
    >
      Beri Dukungan
    </a>
  );
}
