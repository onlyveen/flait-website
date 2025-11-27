import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TermsContent from '@/components/TermsContent';

export const metadata = {
  title: "Terms of Service - Flait",
  description: "Terms of Service for flAIt - Your AI Travel Manager on WhatsApp",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-bg pt-20">
        {/* Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <TermsContent />
        </main>
      </div>
      <Footer />
    </>
  );
}
