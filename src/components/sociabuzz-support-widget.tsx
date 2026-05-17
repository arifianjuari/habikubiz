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

function hasRenderedWidget() {
  return Boolean(
    document.getElementById("wrapperFloatingBtn") ||
      document.getElementById("btnModal") ||
      document.getElementById("sbModalOverlay") ||
      document.getElementById("sbModal"),
  );
}

function tryDrawSociabuzz(): boolean {
  if (hasRenderedWidget()) return true;
  const draw = window.sbBoW?.draw;
  if (!draw) return false;
  draw(...DRAW_ARGS);
  return hasRenderedWidget();
}

export function SociabuzzSupportWidget() {
  const drew = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [showFallback, setShowFallback] = useState(false);

  const clearRetry = useCallback(() => {
    if (intervalRef.current != null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const initWidget = useCallback(() => {
    if (drew.current || hasRenderedWidget()) {
      drew.current = true;
      setShowFallback(false);
      clearRetry();
      return;
    }

    if (tryDrawSociabuzz()) {
      drew.current = true;
      setShowFallback(false);
      clearRetry();
      return;
    }

    if (intervalRef.current != null) return;

    let attempts = 0;
    intervalRef.current = setInterval(() => {
      attempts += 1;
      if (tryDrawSociabuzz()) {
        drew.current = true;
        setShowFallback(false);
        clearRetry();
      } else if (attempts >= 80) {
        clearRetry();
        setShowFallback(true);
        console.warn(
          "[Sociabuzz] widget tidak muncul — kemungkinan diblokir adblock/shields/CSP. Menampilkan fallback button.",
        );
      }
    }, 50);
  }, [clearRetry]);

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
