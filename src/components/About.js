"use client";

import { useEffect, useRef } from "react";
import { gsap, scrollTriggerDefaults } from "@/utils/gsapConfig";

export default function About() {
  const sectionRef = useRef(null);
  const aboutTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // About text blur animation - tied to scroll position
      gsap.from(aboutTextRef.current.querySelectorAll('.blur-word'), {
        filter: 'blur(10px)',
        opacity: 0,
        stagger: 0.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: '130% bottom',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <p ref={aboutTextRef} className="text-primary font-semibold text-2xl md:text-3xl leading-10 md:leading-12">
            {`Flait is an AI-powered travel assistant that tracks your flights in real time and delivers every important update directly on WhatsApp. From check-in reminders and gate changes to delays, cancellations, and landing updates, Flait keeps you informed at every step. No app installs, no logins, no clutter — just fast, accurate, essential travel information. Designed for smooth, stress-free journeys anywhere in the world.`
              .split(' ')
              .map((word, i) => (
                <span key={i} className="inline-block blur-word">
                  {word}&nbsp;
                </span>
              ))}
          </p>
        </div>
      </div>
    </section>
  );
}
