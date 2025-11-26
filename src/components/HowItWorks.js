"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  gsap,
  ScrollTrigger,
  animations,
  gsapConfig,
  scrollTriggerDefaults,
} from "@/utils/gsapConfig";

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);
  const steps = [
    {
      title: "Add your flight",
      description:
        `Text us your flight number on <span class="text-accent font-bold">WhatsApp</span>. flAIt recognizes the airline, cities, times, terminals, and status automatically.`,
      number: "1",
      image: "/landing-page/how-it-works/add-your-flight.png",
      icon: "/landing-page/how-it-works/ico-add-your-flight.svg",
    },
    {
      title: "Real-time alerts",
      description:
        `From gate changes to baggage claim, receive <span class="text-accent font-bold">Instant Notifications</span> for every step of your journey.`,
      number: "2",
      image: "/landing-page/how-it-works/real-time-alerts.png",
      icon: "/landing-page/how-it-works/ico-real-time-alerts.svg",
    },
    {
      title: "Get check-in reminder",
      description:
        `Get a WhatsApp <span class="text-accent font-bold">Reminder</span> to check in 48 hours before your flight, so you never miss the check-in window.`,
      number: "3",
      image: "/landing-page/how-it-works/get-check-in-reminder.png",
      icon: "/landing-page/how-it-works/ico-get-check-in-reminder.svg",
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

      // Step cards stagger animation
      gsap.from(cardsRef.current.children, {
        opacity: 0,
        y: 60,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: cardsRef.current,
          ...scrollTriggerDefaults,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-20 bg-primary"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="font-excon font-bold h2 text-white mb-2">
            How It Works
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-8 lg:gap-12"
        >
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Phone Mockup Image */}
              <div className={`mb-6 relative bg-white px-5 gap-8 w-full flex items-center rounded-2xl ${
                index === 1 ? 'flex-col pb-5' : 'flex-col-reverse pt-5'
              }`}>
                <Image
                  src={step.image}
                  alt={step.title}
                  width={200}
                  height={380}
                  className="h-40 w-auto"
                />
                <h3 className="font-excon font-bold text-xl flex flex-col items-center text-primary">
                  <Image
                    src={step.icon}
                    alt={step.title}
                    width={30}
                    height={30}
                  />
                  {step.title}
                </h3>
              </div>

              <p className="font-satoshi text-white leading-relaxed text-md max-w-xs">
                <span dangerouslySetInnerHTML={{ __html: step.description }} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
