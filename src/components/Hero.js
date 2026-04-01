"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, animations, gsapConfig } from "@/utils/gsapConfig";
import AnimatedText from "./AnimatedText";
import Globe from "./Globe";

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
            className="font-satoshi text-sm md:text-lg text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            Live flight updates, check-in reminders, gate changes, delays, and
            smart travel assistance — all inside WhatsApp.
          </p>

          {/* Form - Horizontal Layout */}
          <form
            onSubmit={handleSubmit}
            ref={formRef}
            className="flex max-md:mb-15 flex-col sm:flex-row gap-0 items-stretch md:justify-self-center mx-auto md:bg-white  max-md:max-w-4/5 md:rounded-full md:shadow-lg p-0 md:p-2"
          >
            <input
              type="text"
              name="flightNumber"
              placeholder="Flight Number"
              required
              pattern="[A-Za-z]{2}\s?\d{1,4}"
              title="Enter a valid flight number (e.g., AA1234)"
              className=" flex-1 px-5 py-3 text-base max-md:text-xl max-md:py-4 md:rounded-full sm:rounded-r-none sm:border-r sm:border-border/20 bg-white border-0 focus:outline-none font-satoshi max-md:rounded-t-3xl max-md:shadow-xl"
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
                className="w-full px-5 py-3 text-base max-md:text-xl max-md:py-4 md:rounded-full max-md:rounded-b-3xl max-md:shadow-xl sm:rounded-l-none sm:border-r sm:border-border/20 bg-white border-0 focus:outline-none font-satoshi"
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
              className="flex items-center max-md:mt-5"
            >

              <AnimatedText text="Get Updates" className="bg-primary max-md:mt-0 max-md:mx-5 max-md:my-2 max-md:w-full cursor-pointer text-white font-satoshi font-bold max-md:py-5 max-md:text-xl py-3 px-8 text-base rounded-full hover:bg-secondary transition-colors whitespace-nowrap" />

            </button>
          </form>
        </div>

        {/* Illustration Area */}
      </div>
      {/* Globe Illustration — 1.5x enlarged, top half cropped */}
      {/* Crop container: height = half globe width (37.5vw = 75vw / 2) */}
      <div
        ref={illustrationRef}
        className="globe-crop relative -mt-8 overflow-hidden"
      >
        {/* Globe: 1.5× current size, centered, anchored to top */}
        <div
          className="globe-size absolute top-0 left-1/2 -translate-x-1/2"
          style={{ aspectRatio: "1 / 1" }}
        >
          <Globe className="w-full h-full" />

          {/* WhatsApp notification card — left */}
          <div className="absolute top-[22%] left-[-2%] max-md:left-[10%] scale-[.85] max-md:top-[35%] max-md:scale-[.6] origin-top-left z-10 animate-float">
            <div className="bg-[#4B6CB7] text-white rounded-2xl px-4 py-3 shadow-2xl min-w-[200px] sm:min-w-[240px]">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span className="text-xs font-satoshi font-medium opacity-90">Whatsapp</span>
                </div>
                <span className="text-xs font-satoshi opacity-70">Now</span>
              </div>
              <p className="text-sm font-satoshi font-bold leading-tight">Flait</p>
              <p className="text-xs font-satoshi opacity-90 mt-0.5">FYI, Flight Delayed by 30 mins</p>
            </div>
          </div>

          {/* Check-in reminder card — right */}
          <div className="absolute top-[28%] right-[-2%] scale-[.85] origin-top-right max-md:top-[15%] max-md:scale-[.6] max-md:right-[10%] z-10 animate-float-delayed">
            <div className="bg-white rounded-2xl px-4 py-3 shadow-2xl border border-gray-100 min-w-[210px] sm:min-w-[250px]">
              <p className="text-sm font-satoshi text-gray-800 leading-snug">
                Hello JD,<br />
                <span>🔔 Check-in for BA249 is now open!{" "}</span>
                <a href="#" className="text-[var(--color-primary)] underline font-medium">
                  Click here to check in.
                </a>
              </p>
              <p className="text-xs font-satoshi text-gray-400 mt-2 text-right">11.14 AM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
