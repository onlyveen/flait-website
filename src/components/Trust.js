"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, animations, scrollTriggerDefaults } from "@/utils/gsapConfig";

export default function Trust() {
  const sectionRef = useRef(null);
  const illustrationRef = useRef(null);
  const titleRef = useRef(null);
  const iconsRef = useRef(null);
  const features = [
    {
      icon: "/landing-page/trust/Frame 51.svg",
      text: "Uses trusted aviation data sources",
    },
    {
      icon: "/landing-page/trust/Frame 51-1.svg",
      text: "Works on international and domestic flights",
    },
    {
      icon: "/landing-page/trust/Frame 51-2.svg",
      text: "No tracking, no ads, no spam",
    },
    {
      icon: "/landing-page/trust/Frame 51-3.svg",
      text: "You control your notifications",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Illustration scale & rotate
      gsap.from(illustrationRef.current, {
        opacity: 0,
        scale: 0.8,
        rotation: -5,
        duration: 1,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: sectionRef.current,
          ...scrollTriggerDefaults,
        },
      });

      // Title animation
      gsap.from(titleRef.current, {
        ...animations.fadeUp,
        scrollTrigger: {
          trigger: titleRef.current,
          ...scrollTriggerDefaults,
        },
      });

      // Feature icons pop in sequence
      gsap.from(iconsRef.current.children, {
        opacity: 0,
        scale: 0.5,
        y: 20,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: iconsRef.current,
          ...scrollTriggerDefaults,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="trust">
      <div className="max-w-4xl mx-auto px-12 md:px-8">
        <div className="bg-white rounded-3xl rounded-b-none overflow-hidden border-b-0 border-4 border-primary max-md:p-5 px-50 py-15 relative">
          <div className="flex justify-start md:justify-center absolute md:-left-10 md:-bottom-10  max-md:relative max-md:mb-5">
            <div ref={illustrationRef} className="relative">
              <Image
                src="/landing-page/trust/reliability-illust.svg"
                alt="Reliability illustration"
                width={300}
                height={300}
                className="w-50 h-50 max-md:w-30 max-md:h-30 "
              />
            </div>
          </div>
          <div>
            <h2
              ref={titleRef}
              className="font-excon font-bold h2 text-primary mb-8"
            >
              Built with Reliability
            </h2>

            <div ref={iconsRef} className="space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-2 items-start">
                    <Image
                      src={feature.icon}
                      alt=""
                      width={24}
                      height={24}
                      className="w-12 h-12"
                    />
                  <p className="font-satoshi text-black text-regular leading-relaxed pt-2">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
