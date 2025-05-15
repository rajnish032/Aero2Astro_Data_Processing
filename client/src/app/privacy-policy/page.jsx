"use client";

import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-400">Privacy Policy</h1>
        <p className="mb-6 text-gray-300">Effective Date: 04-04-2025</p>

        <section className="space-y-6 text-gray-400">
          <p>
            Aero2Astro Technologies (&quot;Aero2Astro,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal data when you use our platform, website, and services.
          </p>

          <div>
            <h2 className="text-xl font-semibold text-white">1. Information We Collect</h2>
            <ul className="list-disc pl-6">
              <li>Personal Information: Name, email address, phone number, company name, and payment details.</li>
              <li>Project & Service Data: Information related to gis operations, geospatial projects, and job requests.</li>
              <li>Usage Data: Device information, IP address, browser type, and usage patterns.</li>
              <li>Cookies & Tracking Data: We use cookies and similar technologies to analyze traffic and improve user experience.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6">
              <li>To provide and improve Aero2Astro services.</li>
              <li>To process payments and manage transactions.</li>
              <li>To communicate project updates, promotions, and service enhancements.</li>
              <li>To analyze and enhance platform performance.</li>
              <li>To ensure compliance with legal and regulatory requirements.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">3. How We Share Your Information</h2>
            <ul className="list-disc pl-6">
              <li>Service Providers: For payment processing, data analysis, and support.</li>
              <li>Partners & Affiliates: For integrated geospatial and drone services.</li>
              <li>Legal Authorities: When required by law or for legal protection.</li>
              <li>We do not sell or rent your personal data to third parties.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">4. Data Security</h2>
            <p>We use industry-standard measures to protect your data. However, no online transmission is 100% secure, and users are advised to take precautions.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">5. Your Rights & Choices</h2>
            <ul className="list-disc pl-6">
              <li>Access & Update: You may update your information anytime.</li>
              <li>Opt-Out: Unsubscribe from promotional emails anytime.</li>
              <li>Request Deletion: Ask for data deletion, subject to legal obligations.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">6. Cookies & Tracking Technologies</h2>
            <p>We use cookies for better experience. You can control cookie settings via your browser.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">7. Third-Party Links</h2>
            <p>We may link to third-party websites. Aero2Astro is not responsible for their privacy practices.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy periodically. Changes will be posted with an updated effective date.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">9. Contact Us</h2>
            <ul className="list-disc pl-6">
              <li>Email: flywithus@aero2astro.com</li>
              <li>Phone: +91 6006535445</li>
              <li>Address: HTBI & HEIC, HITS, OMR, PADUR, CHENNAI-603103</li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
