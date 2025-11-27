"use client";

import { useState, useEffect, useRef } from "react";
import {
  gsap,
  ScrollTrigger,
  animations,
  scrollTriggerDefaults,
} from "@/utils/gsapConfig";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const itemsRef = useRef([]);

  const faqData = {
    title: "FAQ — Frequently Asked Questions",
    items: [
      {
        question: "What is Flait?",
        answer:
          "<p>Flait is your AI-powered travel manager that sends flight updates, check-in reminders, gate changes, and important alerts directly on WhatsApp — no app install needed.</p>",
      },
      {
        question: "How do I get flight updates?",
        answer:
          '<p>Just send us your flight number on WhatsApp.<br>Example: <strong>"6E 969 on 12 Dec"</strong><br>Flait automatically detects everything and starts tracking.</p>',
      },
      {
        question: "Is Flait free?",
        answer:
          "<p>Yes — your first 3 trips are free.<br>We only charge if you want unlimited flight tracking or advanced features later.</p>",
      },
      {
        question: "Does Flait work for international flights?",
        answer:
          "<p>Absolutely.<br>We support <strong>1,200+ airlines</strong> and <strong>9,000+ airports</strong> worldwide — domestic and international.</p>",
      },
      {
        question: "Where does Flait get its data?",
        answer:
          "<p>We use trusted sources like:</p><ul><li>ADS-B live aircraft data</li><li>Airline status feeds</li><li>Airport operation systems</li><li>Delay + gate change networks</li></ul><p>Your updates are real-time and highly accurate.</p>",
      },
      {
        question: "Will I get spam or ads?",
        answer:
          "<p>Never.<br>Flait sends only essential travel updates.<br>No marketing, no random ads, no noise.</p>",
      },
      {
        question: "Can I stop notifications anytime?",
        answer:
          '<p>Yes.<br>Send <strong>"stop"</strong> on WhatsApp or use the toggle inside your flight updates — you stay fully in control.</p>',
      },
      {
        question: "Do I need to install any app?",
        answer:
          "<p>No app. No login.<br>Everything happens inside WhatsApp — simple and effortless.</p>",
      },
      {
        question: "Can my family track my flight too?",
        answer:
          "<p>Yes — every flight gets a shareable live status page you can send to family, friends, or your pickup driver.</p>",
      },
      {
        question: "What happens if my flight is delayed or cancelled?",
        answer:
          "<p>Flait immediately alerts you and shows:</p><ul><li>Delay reason</li><li>New timings</li><li>Gate changes</li><li>Suggested rebooking options</li><li>Lounge / waiting area info</li><li>Taxi options on arrival</li></ul><p>It helps you recover quickly.</p>",
      },
      {
        question: "Is my data safe?",
        answer:
          "<p>100%.<br>We don't read your chats, don't sell data, don't track you.<br>Flait only processes flight numbers you choose to send.</p>",
      },
      {
        question: "Can I use Flait for multiple flights?",
        answer:
          "<p>Yes — add as many flights as you want.<br>Flait automatically groups multi-stop trips into a single journey.</p>",
      },
    ],
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Scroll-triggered animations
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

      // FAQ items stagger animation
      gsap.from(itemsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: itemsRef.current[0],
          ...scrollTriggerDefaults,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate answer expansion
  useEffect(() => {
    itemsRef.current.forEach((item, index) => {
      if (item) {
        const answer = item.querySelector(".faq-answer");
        const icon = item.querySelector(".faq-icon");

        if (answer && icon) {
          if (openIndex === index) {
            gsap.to(answer, {
              height: "auto",
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
            });
            gsap.to(icon, {
              rotation: 45,
              duration: 0.3,
              ease: "power2.out",
            });
          } else {
            gsap.to(answer, {
              height: 0,
              opacity: 0,
              duration: 0.4,
              ease: "power2.in",
            });
            gsap.to(icon, {
              rotation: 0,
              duration: 0.3,
              ease: "power2.in",
            });
          }
        }
      }
    });
  }, [openIndex]);

  return (
    <section ref={sectionRef} id="faqs" className="py-20 ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          ref={titleRef}
          className="font-excon font-bold h2 text-center text-primary mb-12"
        >
          {faqData.title}
        </h2>

        <div className="space-y-4">
          {faqData.items.map((item, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="bg-white rounded-2xl overflow-hidden border border-border/20"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full  p-4 cursor-pointer flex justify-between items-center gap-4 text-left  transition-colors"
              >
                <span className="font-satoshi font-bold text-lg max-md:text-base text-text">
                  {item.question}
                </span>
                <svg
                  className="faq-icon w-6 h-6 shrink-0 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
              <div
                className="faq-answer overflow-hidden"
                style={{ height: 0, opacity: 0 }}
              >
                <div
                  className="p-4 pt-0 font-satoshi text-text/80 leading-relaxed faq-content"
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
