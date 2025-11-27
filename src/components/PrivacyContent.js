export default function PrivacyContent() {
  return (
    <div className="prose prose-sm max-w-none font-satoshi">
      <h2 className="font-excon font-bold h2 text-primary mb-4">
        Privacy Policy
      </h2>

      <p className="mb-10 text-text/80">
        <strong>Last Updated:</strong> January 2025
      </p>
      <div className="p-6 bg-white">

      <h4 className="font-satoshi font-bold text-lg text-text mt-6 mb-3">
        1. Information We Collect
      </h4>
      <p className="mb-4 text-text/80 leading-relaxed">
        We collect information you provide directly to us, including:
      </p>
      <ul className="list-disc ml-6 mb-4 text-text/80 space-y-2">
        <li>Flight numbers and travel dates you share via WhatsApp</li>
        <li>WhatsApp phone number for communication</li>
        <li>Usage data and interaction patterns</li>
      </ul>

      <h4 className="font-satoshi font-bold text-lg text-text mt-6 mb-3">
        2. How We Use Your Information
      </h4>
      <p className="mb-4 text-text/80 leading-relaxed">
        Your information is used to:
      </p>
      <ul className="list-disc ml-6 mb-4 text-text/80 space-y-2">
        <li>Provide flight status updates and notifications</li>
        <li>Send check-in reminders and gate change alerts</li>
        <li>Improve our service quality</li>
        <li>Communicate important service updates</li>
      </ul>

      <h4 className="font-satoshi font-bold text-lg text-text mt-6 mb-3">
        3. Data Security
      </h4>
      <p className="mb-4 text-text/80 leading-relaxed">
        We implement industry-standard security measures to protect your personal information. Your data is encrypted in transit and at rest.
      </p>

      <h4 className="font-satoshi font-bold text-lg text-text mt-6 mb-3">
        4. Data Sharing
      </h4>
      <p className="mb-4 text-text/80 leading-relaxed">
        We do not sell your personal information. We only share data with trusted service providers necessary to operate our service.
      </p>

      <h4 className="font-satoshi font-bold text-lg text-text mt-6 mb-3">
        5. Your Rights
      </h4>
      <p className="mb-4 text-text/80 leading-relaxed">
        You have the right to:
      </p>
      <ul className="list-disc ml-6 mb-4 text-text/80 space-y-2">
        <li>Access your personal data</li>
        <li>Request data deletion</li>
        <li>Opt-out of notifications anytime</li>
        <li>Update your information</li>
      </ul>

      <h4 className="font-satoshi font-bold text-lg text-text mt-6 mb-3">
        6. Contact Us
      </h4>
      <p className="mb-4 text-text/80 leading-relaxed">
        For privacy-related questions, please contact us at:{" "}
        <a href="mailto:privacy@flait.com" className="text-primary hover:underline">
          privacy@flait.com
        </a>
      </p>

      <p className="mt-8 text-text/60 text-sm italic">
        This is a placeholder privacy policy. Please update with your actual privacy terms.
      </p>
      </div>
    </div>
  );
}
