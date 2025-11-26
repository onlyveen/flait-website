import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-primary py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <Image
            src="/landing-page/logo-on-dark.svg"
            alt="flAIt"
            width={80}
            height={40}
            className="h-8 w-auto"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <Link href="#about" className="font-satoshi text-white/90 hover:text-white transition-colors">About</Link>
          <Link href="#" className="font-satoshi text-white/90 hover:text-white transition-colors">Terms</Link>
          <Link href="#" className="font-satoshi text-white/90 hover:text-white transition-colors">Privacy</Link>
          <Link href="#" className="font-satoshi text-white/90 hover:text-white transition-colors">Support</Link>
        </div>

        <div className="font-satoshi text-white/80 text-sm">
          © 2025 flAIt
        </div>
      </div>
    </footer>
  );
}
