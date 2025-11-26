"use client";

import Link from 'next/link';
import Image from 'next/image';
import { gsap } from '@/utils/gsapConfig';

export default function Navbar() {
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      gsap.to(window, {
        duration: 0.5,
        scrollTo: { y: target, offsetY: 80 },
        ease: "power2.out"
      });
    }
  };

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <Link href="/" onClick={(e) => handleSmoothScroll(e, "#home")} className="flex items-center">
              <Image
                src="/landing-page/logo.svg"
                alt="flAIt"
                width={100}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#how-it-works"
              onClick={(e) => handleSmoothScroll(e, "#how-it-works")}
              className="font-satoshi font-medium text-text hover:text-primary transition-colors"
            >
              How it Works
            </Link>
            <Link
              href="#why"
              onClick={(e) => handleSmoothScroll(e, "#why")}
              className="font-satoshi font-medium text-text hover:text-primary transition-colors"
            >
              Why flAIt
            </Link>
            <Link
              href="#trust"
              onClick={(e) => handleSmoothScroll(e, "#trust")}
              className="font-satoshi font-medium text-text hover:text-primary transition-colors"
            >
              Trust
            </Link>
          </div>
            <button
              onClick={() => {
                const whatsappUrl = "https://wa.me/14646669094?text=Hi";
                window.open(whatsappUrl, "_blank");
              }}
              className="bg-accent cursor-pointer text-text font-satoshi font-bold py-2.5 px-6 rounded-full hover:opacity-90 transition-opacity"
            >
              Get Updates
            </button>

          {/* Mobile Menu Button (Placeholder) */}
          <div className="md:hidden flex items-center">
            <button className="text-text">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
