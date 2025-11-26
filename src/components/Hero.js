"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, animations, gsapConfig } from "@/utils/gsapConfig";

export default function Hero() {
  const headlineRef = useRef(null);
  const descRef = useRef(null);
  const formRef = useRef(null);
  const illustrationRef = useRef(null);

  const handleDateClick = (e) => {
    e.currentTarget.showPicker?.();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const flightNumber = formData.get("flightNumber");
    const travelDate = formData.get("travelDate");
    const whatsappNumber = formData.get("whatsappNumber");

    const message = `Hi! I'd like to get flight updates for:
Flight: ${flightNumber}
Date: ${travelDate}
WhatsApp: ${whatsappNumber}`;

    const whatsappPhoneNumber = "14646669094"; // +1 (464) 666-9094
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappPhoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation
      gsap.from(headlineRef.current.children, {
        ...animations.fadeUp,
        duration: gsapConfig.duration,
        stagger: 0.2,
        ease: gsapConfig.ease,
      });

      // Description animation
      gsap.from(descRef.current, {
        ...animations.fadeUp,
        duration: gsapConfig.duration,
        delay: 0.4,
        ease: gsapConfig.ease,
      });

      // Form inputs stagger animation
      gsap.from(formRef.current, {
        ...animations.fadeUp,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.6,
        ease: gsapConfig.ease,
      });

      // Illustration fade-in from bottom
      gsap.from(illustrationRef.current, {
        opacity: 0,
        y: 80,
        duration: 1,
        delay: 0.8,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="relative pt-24 lg:pt-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Content - Centered */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1
            ref={headlineRef}
            className="font-excon font-bold text-5xl lg:text-6xl leading-tight mb-6"
          >
            <span className="text-primary block">Your AI Travel Manager</span>
            <span className="text-text block">on Whatsapp</span>
          </h1>

          <p
            ref={descRef}
            className="font-satoshi text-base lg:text-lg text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            Live flight updates, check-in reminders, gate changes, delays, and
            smart travel assistance — all inside WhatsApp.
          </p>

          {/* Form - Horizontal Layout */}
          <form
            onSubmit={handleSubmit}
            ref={formRef}
            className="flex flex-col sm:flex-row gap-0 items-stretch justify-self-center mx-auto bg-white rounded-full shadow-lg p-2"
          >
            <input
              type="text"
              name="flightNumber"
              placeholder="Flight Number"
              required
              pattern="[A-Za-z]{2}\s?\d{1,4}"
              title="Enter a valid flight number (e.g., AA1234)"
              className="max-w-35 flex-1 px-5 py-3 rounded-full sm:rounded-r-none sm:border-r sm:border-border/20 bg-white border-0 focus:outline-none font-satoshi text-sm"
            />
            <input
              type="date"
              name="travelDate"
              placeholder="Travel Date"
              required
              onClick={handleDateClick}
              className="max-w-40 flex-1 px-5 py-3 rounded-full sm:rounded-none sm:border-r sm:border-border/20 bg-white border-0 focus:outline-none font-satoshi text-sm cursor-pointer"
            />
            <input
              type="tel"
              name="whatsappNumber"
              placeholder="Whatsapp Number"
              required
              pattern="[\d\s\-\+\(\)]{10,}"
              title="Enter a valid phone number (minimum 10 digits)"
              className="max-w-45 flex-1 px-5 py-3 rounded-full sm:rounded-l-none sm:border-r sm:border-border/20 bg-white border-0 focus:outline-none font-satoshi text-sm"
            />
            <button
              type="submit"
              className="bg-primary cursor-pointer text-white font-satoshi font-bold py-3 px-8 rounded-full hover:bg-secondary transition-colors whitespace-nowrap"
            >
              Get Updates
            </button>
          </form>
        </div>

        {/* Illustration Area */}
      </div>
      <div ref={illustrationRef} className="relative mt-16 flex justify-center">
        <Image
          src="/landing-page/header-illustration.png"
          alt="Flight tracking illustration"
          width={1000}
          height={200}
          className="w-full h-auto"
          priority
        />
      </div>
    </section>
  );
}
