"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    sbBoW?: {
      draw: (
        slug: string,
        campaignKey: string,
        position: string,
        backgroundColor: string,
        textColor: string,
      ) => void;
    };
  }
}

const SOCIABUZZ_SCRIPT_SRC =
  "https://storage.sociabuzz.com/storage/js/main/buttononwebsite/index.min.js";

const DRAW_ARGS = [
  "habiku",
  "QmVyaSBEdWt1bmdhbg",
  "position-bottom-right",
  "#76CC11",
  "#FFFFFF",
] as const;

const SUPPORT_URL = "https://sociabuzz.com/habiku";

/** Interval: tunggu sbBoW — jangan anggap gagal sebelum skrip siap (~12s). */
const MAX_WAIT_SBOW_ATTEMPTS = 240;
const POLL_MS = 50;

function hasRenderedWidget() {
  return Boolean(
    document.getElementById("wrapperFloatingBtn") ||
      document.getElementById("btnModal") ||
      document.getElementById("sbModalOverlay") ||
      document.getElementById("sbModal"),
  );
}

export function SociabuzzSupportWidget() {
  const drew = useRef(false);
  const drawInvoked = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [showFallback, setShowFallback] = useState(false);

  const clearRetry = useCallback(() => {
    if (intervalRef.current != null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  /**
   * Sociabuzz menyisipkan #btnModal secara asinkron — jangan pakai
   * hasRenderedWidget() langsung setelah draw() sebagai syarat sukses.
   * - Kalau sbBoW belum ada: false (terus poll).
   * - Kalau draw() sudah dipanggil sekali: true (henti poll; biarkan DOM tampil).
   */
  const tryProgress = useCallback((): boolean => {
    if (hasRenderedWidget()) return true;
    const draw = window.sbBoW?.draw;
    if (!draw) return false;
    if (!drawInvoked.current) {
      draw(...DRAW_ARGS);
      drawInvoked.current = true;
    }
    return true;
  }, []);

  const initWidget = useCallback(() => {
    if (drew.current || hasRenderedWidget()) {
      drew.current = true;
      setShowFallback(false);
      clearRetry();
      return;
    }

    if (tryProgress()) {
      drew.current = true;
      setShowFallback(false);
      clearRetry();
      return;
    }

    if (intervalRef.current != null) return;

    let attempts = 0;
    intervalRef.current = setInterval(() => {
      attempts += 1;
      if (tryProgress()) {
        drew.current = true;
        setShowFallback(false);
        clearRetry();
        return;
      }
      if (attempts >= MAX_WAIT_SBOW_ATTEMPTS) {
        clearRetry();
        setShowFallback(true);
        console.warn(
          "[Sociabuzz] sbBoW tidak siap — cek Network, adblock, atau CSP. Menampilkan fallback.",
        );
      }
    }, POLL_MS);
  }, [clearRetry, tryProgress]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      initWidget();
    });
    return () => {
      cancelAnimationFrame(frame);
      clearRetry();
    };
  }, [initWidget, clearRetry]);

  return (
    <>
      <Script
        src={SOCIABUZZ_SCRIPT_SRC}
        strategy="afterInteractive"
        onLoad={initWidget}
        onError={() => {
          setShowFallback(true);
          console.error("[Sociabuzz] gagal memuat skrip dari CDN. Menampilkan fallback button.");
        }}
      />

      {showFallback ? (
        <a
          href={SUPPORT_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Beri dukungan melalui Sociabuzz"
          className="fixed bottom-6 right-6 z-[9999997] inline-flex min-h-[47px] max-w-[220px] items-center justify-center rounded-full border border-[#76CC11] bg-[#76CC11] px-4 py-3 text-center text-sm font-extrabold leading-[140%] text-white shadow-xl shadow-black/20"
        >
          Beri dukungan
        </a>
      ) : null}
    </>
  );
}
