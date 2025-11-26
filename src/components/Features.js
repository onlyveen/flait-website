"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, animations, scrollTriggerDefaults } from "@/utils/gsapConfig";

export default function Features() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const featuresRef = useRef(null);
  const features = [
    {
      number: "1",
      title: "WhatsApp-first convenience",
      description:
        "Live updates. Delays. Boarding calls. they important alerts arrive instantly.",
    },
    {
      number: "2",
      title: "Proactive travel intelligence",
      description: "Not just alerts — actionable suggestions.",
    },
    {
      number: "3",
      title: "Journeys, not flights",
      description:
        "flAIt automatically groups multi-stop trips into a single journey.",
    },
    {
      number: "4",
      title: "Family & friends updates",
      description:
        "Share your live flight status page so others can track your arrival.",
    },
    {
      number: "5",
      title: "Built for global travel",
      description: "Works with all major airlines and airports.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        ...animations.fadeUp,
        scrollTrigger: {
          trigger: titleRef.current,
          ...scrollTriggerDefaults,
        },
      });

      // Feature items cascade with alternating directions
      gsap.from(featuresRef.current.children, {
        opacity: 0,
        x: (index) => (index % 2 === 0 ? -60 : 60),
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          ...scrollTriggerDefaults,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why"
      className="py-24 bg-bg relative overflow-hidden"
    >
      {/* Background SVG */}
      <div className="absolute inset-0">
        <Image
          src="/landing-page/why/why-bg.svg"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={titleRef} className="text-center mb-10">
          <h2 className="font-excon font-bold h2 text-primary ">
            Why Flait
          </h2>
        </div>

        <div ref={featuresRef} className="space-y-8">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-10 items-start">
              <div className="shrink-0">
                <span className="font-excon font-light text-5xl text-primary">
                  {feature.number}
                </span>
              </div>
              <h3 className="font-excon w-1/4 font-bold text-xl text-primary mb-2">
                {feature.title}
              </h3>
              <div className="w-2/4 pt-2">
                <p className="font-satoshi text-black leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
