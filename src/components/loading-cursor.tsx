"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function LoadingCursor() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.add("loading");
    const timer = setTimeout(() => {
      document.body.classList.remove("loading");
    }, 100);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove("loading");
    };
  }, [pathname]);

  return null;
}
