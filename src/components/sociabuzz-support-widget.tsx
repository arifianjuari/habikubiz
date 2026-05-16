"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

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

function tryDrawSociabuzz(): boolean {
  const draw = window.sbBoW?.draw;
  if (!draw) return false;
  draw(...DRAW_ARGS);
  return true;
}

export function SociabuzzSupportWidget() {
  const drew = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearRetry = useCallback(() => {
    if (intervalRef.current != null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const initWidget = useCallback(() => {
    if (drew.current) return;
    if (tryDrawSociabuzz()) {
      drew.current = true;
      clearRetry();
      return;
    }
    if (intervalRef.current != null) return;
    let attempts = 0;
    intervalRef.current = setInterval(() => {
      attempts += 1;
      if (tryDrawSociabuzz()) {
        drew.current = true;
        clearRetry();
      } else if (attempts >= 80) {
        clearRetry();
        console.warn(
          "[Sociabuzz] window.sbBoW tidak tersedia — cek Network (index.min.js), pemblokir iklan, dan CSP.",
        );
      }
    }, 50);
  }, [clearRetry]);

  useEffect(() => {
    initWidget();
    return clearRetry;
  }, [initWidget, clearRetry]);

  return (
    <Script
      src={SOCIABUZZ_SCRIPT_SRC}
      strategy="afterInteractive"
      onLoad={initWidget}
      onError={() => {
        console.error("[Sociabuzz] gagal memuat skrip dari CDN (blokir jaringan, CSP, atau host).");
      }}
    />
  );
}
