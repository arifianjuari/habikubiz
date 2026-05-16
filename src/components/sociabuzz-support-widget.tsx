"use client";

import Script from "next/script";
import { useCallback } from "react";

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

export function SociabuzzSupportWidget() {
  const initWidget = useCallback(() => {
    window.sbBoW?.draw(
      "habiku",
      "QmVyaSBEdWt1bmdhbg",
      "position-bottom-right",
      "#76CC11",
      "#FFFFFF",
    );
  }, []);

  return (
    <Script src={SOCIABUZZ_SCRIPT_SRC} strategy="afterInteractive" onLoad={initWidget} />
  );
}
