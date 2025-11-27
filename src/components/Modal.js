"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/utils/gsapConfig";

export default function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = "hidden";

      // Set initial state
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(contentRef.current, { opacity: 0, y: 20, scale: 0.95 });

      // Animate in
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.4)",
      });
    } else {
      // Restore body scroll
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.95,
      duration: 0.2,
      ease: "power2.in",
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };

  const handleEscape = (e) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={handleOverlayClick}
        className="absolute inset-0 bg-text/60 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <div
        ref={contentRef}
        className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border/20 px-6 py-4 flex justify-between items-center">
          <h2 className="font-excon font-bold text-2xl text-primary">
            {title}
          </h2>
          <button
            onClick={handleClose}
            className="text-text/60 hover:text-text transition-colors p-2"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 overflow-y-auto max-h-[calc(80vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
}
