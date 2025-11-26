import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import Trust from '@/components/Trust';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import SmoothScrollWrapper from '@/components/SmoothScrollWrapper';

export default function Home() {
  return (
    <>
      <Navbar />
      <SmoothScrollWrapper>

      <Hero />
      <HowItWorks />
      <Features />
      <Trust />
      <CTASection />
      <Footer />
      </SmoothScrollWrapper>
    </>
  );
}
