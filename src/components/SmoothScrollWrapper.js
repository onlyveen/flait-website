"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/utils/gsapConfig";

export default function SmoothScrollWrapper({ children }) {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    // Set body height to content height for scrollbar
    const setBodyHeight = () => {
      if (contentRef.current) {
        document.body.style.height = `${contentRef.current.offsetHeight}px`;
      }
    };

    setBodyHeight();
    window.addEventListener("resize", setBodyHeight);

    // Smooth scroll variables
    let scrollY = 0;
    let currentY = 0;
    const smoothness = 0.95; // 50% faster (was 0.9)

    // Set up smooth scroll
    const updateScroll = () => {
      scrollY = window.pageYOffset;
      currentY = gsap.utils.interpolate(currentY, scrollY, smoothness);

      if (contentRef.current) {
        gsap.set(contentRef.current, {
          y: -currentY,
          force3D: true,
        });
      }

      ScrollTrigger.update();
    };

    // Start GSAP ticker
    gsap.ticker.add(updateScroll);

    // Refresh ScrollTrigger
    setTimeout(() => {
      setBodyHeight();
      ScrollTrigger.refresh();
    }, 100);

    // Cleanup
    return () => {
      gsap.ticker.remove(updateScroll);
      window.removeEventListener("resize", setBodyHeight);
      document.body.style.height = "";
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden" }}>
      <div ref={contentRef} style={{ willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}
