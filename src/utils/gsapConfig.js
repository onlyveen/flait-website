"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

// Default GSAP settings
export const gsapConfig = {
  ease: "power2.out",
  duration: 0.8,
  stagger: 0.15,
};

// Scroll animation defaults
export const scrollTriggerDefaults = {
  start: "top 80%",
  end: "bottom 20%",
  toggleActions: "play none none reverse",
};

// Animation presets
export const animations = {
  fadeUp: {
    opacity: 0,
    y: 50,
  },
  fadeDown: {
    opacity: 0,
    y: -50,
  },
  fadeLeft: {
    opacity: 0,
    x: -50,
  },
  fadeRight: {
    opacity: 0,
    x: 50,
  },
  scale: {
    opacity: 0,
    scale: 0.8,
  },
};

export { gsap, ScrollTrigger, ScrollToPlugin };
