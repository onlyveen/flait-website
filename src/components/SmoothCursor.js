'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function SmoothCursor() {
  const cursorRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [trail, setTrail] = useState([]);

  // Store position and rotation
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const rotation = useRef(0);
  const lastTrailTime = useRef(0);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile) {
      return () => window.removeEventListener('resize', checkMobile);
    }

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Check if hovering over element with custom cursor
      const cursorStyle = window.getComputedStyle(e.target).cursor;
      const shouldShow = cursorStyle === 'none' || cursorStyle === 'auto';

      if (shouldShow && !isVisible) {
        setIsVisible(true);
        cursorPos.current = { x: e.clientX, y: e.clientY };
      } else if (!shouldShow && isVisible) {
        setIsVisible(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Animation loop
    const animateCursor = () => {
      if (!cursorRef.current) return;

      // Smooth follow with easing
      const dx = mousePos.current.x - cursorPos.current.x;
      const dy = mousePos.current.y - cursorPos.current.y;

      cursorPos.current.x += dx * 0.15;
      cursorPos.current.y += dy * 0.15;

      // Only update rotation if there's significant movement
      const velocity = Math.sqrt(dx * dx + dy * dy);
      if (velocity > 2) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        // Add 90 to point airplane forward
        let targetRotation = angle + 90;

        // Handle rotation wrapping
        let diff = targetRotation - rotation.current;
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;

        rotation.current += diff * 0.15;
      }

      // Add trail point every 30ms
      const now = Date.now();
      if (now - lastTrailTime.current > 30 && velocity > 0.1) {
        lastTrailTime.current = now;
        setTrail(prev => [...prev, {
          x: cursorPos.current.x,
          y: cursorPos.current.y,
          timestamp: now,
          id: Math.random()
        }]);
      }

      // Clean up old trail points (older than 400ms)
      setTrail(prev => prev.filter(dot => now - dot.timestamp < 300));

      // Apply transform (center the 40x40 cursor)
      cursorRef.current.style.transform = `translate(${cursorPos.current.x - 20}px, ${cursorPos.current.y - 20}px) rotate(${Math.round(rotation.current)}deg)`;

      requestAnimationFrame(animateCursor);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const animationId = requestAnimationFrame(animateCursor);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('resize', checkMobile);
      cancelAnimationFrame(animationId);
    };
  }, [isVisible, isMobile]);

  // Hide on mobile devices
  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Hide default cursor only */}
      <style jsx global>{`
        body {
          cursor: none !important;
        }
      `}</style>

      {/* Trail line - Smooth curve */}
      {trail.length > 1 && (
        <svg
          className="fixed top-0 left-0 pointer-events-none"
          style={{
            width: '100vw',
            height: '100vh',
            zIndex: 9998
          }}
        >
          <path
            d={(() => {
              if (trail.length < 2) return '';

              let path = `M ${trail[0].x},${trail[0].y}`;

              for (let i = 1; i < trail.length; i++) {
                const curr = trail[i];
                const prev = trail[i - 1];

                if (i < trail.length - 1) {
                  const next = trail[i + 1];
                  const cpx = curr.x;
                  const cpy = curr.y;
                  const endX = (curr.x + next.x) / 2;
                  const endY = (curr.y + next.y) / 2;
                  path += ` Q ${cpx},${cpy} ${endX},${endY}`;
                } else {
                  path += ` L ${curr.x},${curr.y}`;
                }
              }

              return path;
            })()}
            fill="none"
            stroke="#0640AD"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="10,10"
            opacity="0.2"
          />
        </svg>
      )}

      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      >
        <Image
          src="/landing-page/flight-cursor-icon.svg"
          alt="cursor"
          width={40}
          height={40}
          style={{
            filter: 'invert(1)',
          }}
        />
      </div>
    </>
  );
}
