"use client";

import { useRef } from 'react';
import { gsap } from '@/utils/gsapConfig';

export default function AnimatedText({
  text,
  className = "",
  topEnterDelay = 0,        // Instance 1 (top text) - delay when leaving
  topLeaveDelay = 0.2,      // Instance 1 (top text) - delay when returning
  bottomEnterDelay = 0.2,   // Instance 2 (bottom text) - delay when arriving
  bottomLeaveDelay = 0,     // Instance 2 (bottom text) - delay when leaving
  stagger = 0.02,
  duration = 0.2
}) {
  const wrapperRef = useRef(null);

  const handleHover = (isEntering) => {
    if (!wrapperRef.current) return;

    const topChars = wrapperRef.current.querySelectorAll('.char-top');
    const bottomChars = wrapperRef.current.querySelectorAll('.char-bottom');

    // Kill any ongoing animations to prevent conflicts
    gsap.killTweensOf([...topChars, ...bottomChars]);

    if (isEntering) {
      // Instance 1: Animate top text out (up and fade)
      gsap.to(topChars, {
        y: -20,
        opacity: 0,
        duration,
        stagger,
        ease: "power2.in",
        delay: topEnterDelay
      });

      // Instance 2: Animate bottom text in (up from below)
      gsap.fromTo(bottomChars,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          ease: "power2.out",
          delay: bottomEnterDelay
        }
      );
    } else {
      // Instance 2: Hide bottom text
      gsap.to(bottomChars, {
        y: 20,
        opacity: 0,
        duration,
        stagger,
        ease: "power2.in",
        delay: bottomLeaveDelay
      });

      // Instance 1: Animate top text back in
      gsap.to(topChars, {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        ease: "power2.out",
        delay: topLeaveDelay
      });
    }
  };

  return (
    <span
      ref={wrapperRef}
      className={`relative inline-block overflow-hidden ${className}`}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      {/* Invisible spacer to maintain width */}
      <span className="inline-flex invisible">
        {text.split('').map((char, idx) => (
          <span key={`spacer-${idx}`} className="inline-block">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>

      {/* Top text - visible by default */}
      <span className="absolute top-0 left-0 inline-flex right-0 bottom-0 items-center justify-center">
        {text.split('').map((char, idx) => (
          <span key={`top-${idx}`} className="char-top inline-block">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>

      {/* Bottom text - hidden below */}
      <span className="absolute top-0 left-0 inline-flex right-0 bottom-0 items-center justify-center">
        {text.split('').map((char, idx) => (
          <span key={`bottom-${idx}`} className="char-bottom inline-block" style={{ transform: 'translateY(20px)', opacity: 0 }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    </span>
  );
}
