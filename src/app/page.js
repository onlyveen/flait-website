import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import Trust from '@/components/Trust';
import CTASection from '@/components/CTASection';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

export default function Home() {
  return (
    <>
      <Navbar />
      <PageTransition>
          <Hero />
          <HowItWorks />
          <Features />
          <Trust />
          <CTASection />
          <FAQ />
          <Footer />
      </PageTransition>
    </>
  );
}
