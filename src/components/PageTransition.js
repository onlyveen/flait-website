"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/utils/gsapConfig";

export default function PageTransition({ children }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Simple fade in - let browser handle hash scroll naturally
    gsap.to(wrapperRef.current, {
      opacity: 1,
      duration: 0.6,
      delay: 0.3, // Delay to let browser scroll to hash first
      ease: "power2.out",
    });
  }, []);

  return (
    <div ref={wrapperRef} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
