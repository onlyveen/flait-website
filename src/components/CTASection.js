"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, animations, scrollTriggerDefaults } from "@/utils/gsapConfig";

export default function CTASection() {
  const sectionRef = useRef(null);
  const iconRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
  

      // Title fade up
      gsap.from(titleRef.current, {
        ...animations.fadeUp,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          ...scrollTriggerDefaults,
        },
      });

      // Description fade up
      gsap.from(descRef.current, {
        ...animations.fadeUp,
        delay: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          ...scrollTriggerDefaults,
        },
      });

      // Button scale in
      gsap.from(buttonRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        delay: 0.6,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: sectionRef.current,
          ...scrollTriggerDefaults,
        },
      });

      // Add continuous pulse animation to icon
      gsap.to(iconRef.current, {
        scale: 1.1,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="get-started"
      className="py-12 bg-primary max-w-5xl mx-auto relative overflow-hidden rounded-4xl mb-24 text-center"
    >
      <div
        className="flex justify-center absolute right-0 bottom-0"
      >
        <Image
          src="/landing-page/cta/whatsapp.svg"
          alt="WhatsApp"
          width={60}
          height={60}
          className="w-30 h-30"
        />
      </div>

      <h2
        ref={titleRef}
        className="font-excon font-bold h2 text-white mb-3"
      >
        Get flight updates on WhatsApp
      </h2>
      <p
        ref={descRef}
        className="font-satoshi text-lg text-white/90 mb-10 max-w-2xl mx-auto"
      >
        Send us your flight number. That's it. flAIt takes over from there.
      </p>
      <button
        ref={buttonRef}
        onClick={() => {
          const whatsappUrl = "https://wa.me/14646669094?text=Hi";
          window.open(whatsappUrl, "_blank");
        }}
        className="bg-accent cursor-pointer text-text font-satoshi font-bold py-4 px-10 rounded-full hover:opacity-90 transition-opacity shadow-xl inline-block"
      >
        Get Updates
      </button>
    </section>
  );
}
