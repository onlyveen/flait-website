"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, animations, gsapConfig } from "@/utils/gsapConfig";
import AnimatedText from "./AnimatedText";

export default function Hero() {
  const headlineRef = useRef(null);
  const descRef = useRef(null);
  const formRef = useRef(null);
  const illustrationRef = useRef(null);
  const dateInputRef = useRef(null);
  const datePlaceholderRef = useRef(null);
  const [isIOSorSafari, setIsIOSorSafari] = useState(false);

  useEffect(() => {
    // Detect iOS or Safari
    const ua = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua);
    const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
    setIsIOSorSafari(isIOS || isSafari);
  }, []);

  const handleDateClick = (e) => {
    e.currentTarget.showPicker?.();
  };

  const handleDateChange = (e) => {
    if (isIOSorSafari && datePlaceholderRef.current) {
      datePlaceholderRef.current.style.display = e.target.value ? 'none' : 'block';
    }
  };

  const handleDateFocus = () => {
    if (isIOSorSafari && datePlaceholderRef.current) {
      datePlaceholderRef.current.style.display = 'none';
    }
  };

  const handleDateBlur = (e) => {
    if (isIOSorSafari && datePlaceholderRef.current && !e.target.value) {
      datePlaceholderRef.current.style.display = 'block';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const flightNumber = formData.get("flightNumber");
    const travelDate = formData.get("travelDate");

    const message = `Hi! I'd like to get flight updates for:
Flight: ${flightNumber}
Date: ${travelDate}`;

    const whatsappPhoneNumber = "14646669094"; // +1 (464) 666-9094
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappPhoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline blur text animation
      gsap.from(headlineRef.current.querySelectorAll('.blur-char'), {
        filter: 'blur(10px)',
        opacity: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: 'power2.out',
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
    <section id="home" className="relative pt-30 lg:pt-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Content - Centered */}
        <div className="text-center max-w-4xl mx-auto mb-12 max-md:mb-0">
          <h1
            ref={headlineRef}
            className="font-excon font-bold h1 leading-tight mb-6"
          >
            <div className="text-primary">
              {'Your AI Travel Manager'.split(' ').map((word, wordIndex, words) => (
                <span key={wordIndex} className="inline-block whitespace-nowrap">
                  {word.split('').map((char, charIndex) => (
                    <span key={charIndex} className="inline-block blur-char">
                      {char}
                    </span>
                  ))}
                  {wordIndex < words.length - 1 && <span className="inline-block blur-char">&nbsp;</span>}
                </span>
              ))}
            </div>
            <div className="text-text">
              {'on Whatsapp'.split(' ').map((word, wordIndex, words) => (
                <span key={wordIndex} className="inline-block whitespace-nowrap">
                  {word.split('').map((char, charIndex) => (
                    <span key={charIndex} className="inline-block blur-char">
                      {char}
                    </span>
                  ))}
                  {wordIndex < words.length - 1 && <span className="inline-block blur-char">&nbsp;</span>}
                </span>
              ))}
            </div>
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
            className="flex max-md:mb-15 flex-col sm:flex-row gap-0 items-stretch md:justify-self-center mx-auto bg-white rounded-xl max-md:max-w-4/5 md:rounded-full shadow-lg p-0 md:p-2"
          >
            <input
              type="text"
              name="flightNumber"
              placeholder="Flight Number"
              required
              pattern="[A-Za-z]{2}\s?\d{1,4}"
              title="Enter a valid flight number (e.g., AA1234)"
              className=" flex-1 px-5 py-3 text-base max-md:text-xl max-md:py-4 rounded-full sm:rounded-r-none sm:border-r sm:border-border/20 bg-white border-0 focus:outline-none font-satoshi "
            />
            <div className="flex-1 relative max-md:border-t border-border">
              <input
                ref={dateInputRef}
                type="date"
                name="travelDate"
                required
                onClick={handleDateClick}
                onChange={handleDateChange}
                onFocus={handleDateFocus}
                onBlur={handleDateBlur}
                className="w-full px-5 py-3 text-base max-md:text-xl max-md:py-4 rounded-full sm:rounded-l-none sm:border-r sm:border-border/20 bg-white border-0 focus:outline-none font-satoshi"
                style={{
                  colorScheme: 'light',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none'
                }}
              />
              <span
                ref={datePlaceholderRef}
                className="absolute left-5 top-1/2 max-md:text-xl max-md:py-4 -translate-y-1/2 text-base text-gray-400 font-satoshi pointer-events-none select-none"
              >
                Travel Date
              </span>
            </div>
            {/* <input
              type="tel"
              name="whatsappNumber"
              placeholder="Whatsapp Number"
              required
              pattern="[\d\s\-\+\(\)]{10,}"
              title="Enter a valid phone number (minimum 10 digits)"
            /> */}
            <button
              type="submit"
              className="flex items-center"
            >
                
              <AnimatedText text="Get Updates" className="bg-primary max-md:mt-0 max-md:-mx-5 cursor-pointer text-white font-satoshi font-bold max-md:py-5 max-md:text-xl py-3 px-8 text-base rounded-full hover:bg-secondary transition-colors whitespace-nowrap"/>
              
            </button>
          </form>
        </div>

        {/* Illustration Area */}
      </div>
      <div ref={illustrationRef} className="relative mt-16 flex justify-center max-md:mt-0">
        <Image
          src="/landing-page/header-illustration.png"
          alt="Flight tracking illustration"
          width={1000}
          height={200}
          className="w-[200%] max-w-none h-auto"
          priority
        />
      </div>
    </section>
  );
}
