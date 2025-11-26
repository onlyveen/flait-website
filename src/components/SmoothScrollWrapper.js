"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/utils/gsapConfig";

export default function SmoothScrollWrapper({ children }) {
  useEffect(() => {
    // Refresh ScrollTrigger after component mounts
    ScrollTrigger.refresh();

    // Add CSS-based smooth scrolling
    document.documentElement.style.scrollBehavior = "smooth";

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}
