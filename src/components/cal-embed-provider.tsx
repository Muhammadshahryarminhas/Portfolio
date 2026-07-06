"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { calConfig } from "@/config/cal";

export function CalEmbedProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void (async () => {
      const cal = await getCalApi();
      cal("ui", {
        layout: calConfig.embedConfig.layout,
      });
    })();
  }, []);

  return children;
}
