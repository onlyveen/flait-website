"use client";

import Link from 'next/link';
import Image from 'next/image';
import AnimatedText from '@/components/AnimatedText';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const startYear = 2025;
  const yearDisplay = currentYear > startYear ? `${startYear} - ${currentYear}` : `${startYear}`;

  return (
    <footer className="bg-primary py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <Image
            src="/landing-page/logo-on-dark.svg"
            alt="Flait"
            width={80}
            height={40}
            className="h-8 w-auto"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <Link
            href="/terms"
            className="font-satoshi text-white/90 hover:text-white transition-colors"
          >
            <AnimatedText text="Terms" />
          </Link>
          <Link
            href="/privacy"
            className="font-satoshi text-white/90 hover:text-white transition-colors"
          >
            <AnimatedText text="Privacy" />
          </Link>
          <a
            href="mailto:support@flait.com"
            className="font-satoshi text-white/90 hover:text-white transition-colors"
          >
            <AnimatedText text="Support" />
          </a>
        </div>

        <div className="font-satoshi text-white/80 text-sm">
          © {yearDisplay} Flait
        </div>
      </div>
    </footer>
  );
}
