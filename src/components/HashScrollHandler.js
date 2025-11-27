"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/utils/gsapConfig";

export default function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    // Only run on home page
    if (pathname !== "/") return;

    // Check if there's a hash in the URL
    const hash = window.location.hash;
    if (!hash) return;

    // Wait for page to fully load and smooth scroll to initialize
    const scrollToHash = () => {
      const target = document.querySelector(hash);
      if (target) {
        // Wait for smooth scroll wrapper to initialize
        setTimeout(() => {
          const targetPosition = target.offsetTop - 80; // Offset for navbar
          window.scrollTo(0, targetPosition);

          // Refresh ScrollTrigger after scroll
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 100);
        }, 500);
      }
    };

    // Execute after a short delay to ensure everything is loaded
    setTimeout(scrollToHash, 100);
  }, [pathname]);

  return null;
}
