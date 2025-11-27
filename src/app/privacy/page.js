import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PrivacyContent from '@/components/PrivacyContent';

export const metadata = {
  title: "Privacy Policy - Flait",
  description: "Privacy Policy for flAIt - Your AI Travel Manager on WhatsApp",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-bg pt-20">
        {/* Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <PrivacyContent />
        </main>
      </div>
      <Footer />
    </>
  );
}
