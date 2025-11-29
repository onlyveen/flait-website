"use client";

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { gsap } from '@/utils/gsapConfig';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const navRef = useRef(null);
  const pathname = usePathname();

  // Navigation items - single source of truth
  const navItems = [
    { href: "/#about", label: "About" },
    { href: "/#how-it-works", label: "How it Works" },
    { href: "/#why", label: "Why Flait" },
    { href: "/#trust", label: "Trust" },
    { href: "/#faqs", label: "FAQs" },
  ];

  const handleWhatsApp = () => {
    window.open("https://wa.me/14646669094?text=Hi", "_blank");
  };

  const handleNavClick = (e, href) => {
    setIsMobileMenuOpen(false); // Close mobile menu on nav click

    // If on home page, use smooth scroll
    if (pathname === '/' && href.startsWith('/#')) {
      e.preventDefault();
      const hash = href.replace('/#', '');
      const target = document.querySelector(`#${hash}`);
      if (target) {
        gsap.to(window, {
          duration: 0.5,
          scrollTo: { y: target, offsetY: 80 },
          ease: "power2.out"
        });
      }
    }
    // Otherwise, let the anchor tag handle it naturally (full reload)
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Animate mobile menu
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.to(mobileMenuRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          display: "block"
        });
      } else {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            if (mobileMenuRef.current) {
              mobileMenuRef.current.style.display = "none";
            }
          }
        });
      }
    }
  }, [isMobileMenuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-100 bg-bg/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 gap-3">
          {/* Logo */}
          <div className="shrink-0 flex items-center max-md:flex-1">
            <a href="/" className="flex items-center">
              <Image
                src="/landing-page/logo.svg"
                alt="Flait"
                width={100}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-satoshi font-medium text-text hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
            <button
              onClick={handleWhatsApp}
              className="bg-accent cursor-pointer text-text font-satoshi font-bold py-2.5 px-6 rounded-full hover:opacity-90 transition-opacity hidden md:flex"
            >
              Get Updates
            </button>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={handleWhatsApp}
              className="bg-accent cursor-pointer text-text font-satoshi font-bold py-2 px-4 rounded-full hover:opacity-90 transition-opacity text-sm"
            >
              Get Updates
            </button>
            <button
              onClick={toggleMobileMenu}
              className="text-text p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          style={{ display: 'none', opacity: 0 }}
          className="md:hidden bg-white/95 backdrop-blur-md rounded-2xl shadow-lg mt-2 mb-4 overflow-hidden"
        >
          <div className="flex flex-col py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-satoshi font-medium text-text hover:text-primary hover:bg-primary/5 transition-colors px-6 py-3"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
