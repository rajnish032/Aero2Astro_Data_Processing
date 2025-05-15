"use client";

import Footer from "@/components/Footer";

const TermsAndConditions = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-400">Terms and Conditions</h1>
        <p className="mb-6 text-gray-300">Effective Date: 04-04-2025</p>
        <p className="mb-6 text-gray-400">
          Welcome to Aero2Astro! These Terms and Conditions govern your access and use of our services, including our website, platform, and any associated applications. By using our services, you agree to be bound by these Terms. If you do not agree, please refrain from using our services.
        </p>
        <ol className="list-decimal pl-6 space-y-4 text-gray-400">
          <li>
            <strong>Definitions</strong>
            <ul className="list-disc pl-6">
              <li>&quot;Aero2Astro&quot; refers to Aero2Astro or Aero2Astro Technologies, including its affiliates, partners, and subsidiaries.</li>
              <li>&quot;User&quot; refers to any individual or entity using our services.</li>
              <li>&quot;Services&quot; refer to the drone technology, geospatial intelligence, and other related services provided by Aero2Astro.</li>
              <li>&quot;Platform&quot; refers to the Aero2Astro website, applications, and any other digital tools provided.</li>
            </ul>
          </li>
          <li>
            <strong>Eligibility</strong> - You must be at least 18 years old to use our services. By using Aero2Astro, you represent that you have the legal authority to enter into this agreement.
          </li>
          <li>
            <strong>User Accounts</strong>
            <ul className="list-disc pl-6">
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>Aero2Astro reserves the right to suspend or terminate accounts found in violation of these Terms.</li>
            </ul>
          </li>
          <li>
            <strong>Use of Services</strong>
            <ul className="list-disc pl-6">
              <li>Our services are intended for legal and ethical use only.</li>
              <li>Users agree not to misuse the platform, interfere with operations, or engage in unauthorized data collection.</li>
              <li>Any attempt to reverse-engineer or replicate our technology without permission is strictly prohibited.</li>
            </ul>
          </li>
          <li>
            <strong>Intellectual Property</strong> - All content, trademarks, and intellectual property on Aero2Astro’s platform remain the property of Aero2Astro. Users may not copy, distribute, or modify Aero2Astro content without prior written consent.
          </li>
          <li>
            <strong>Payments and Fees</strong>
            <ul className="list-disc pl-6">
              <li>Certain services may require payments, which must be completed per the agreed terms.</li>
              <li>Aero2Astro reserves the right to update pricing at any time.</li>
              <li>Failure to make payments may result in account suspension.</li>
            </ul>
          </li>
          <li>
            <strong>Privacy Policy</strong> - Your use of our platform is also governed by our Privacy Policy, which details how we collect, store, and use personal data. By using our services, you consent to our data practices.
          </li>
          <li>
            <strong>Service Availability & Modifications</strong> - Aero2Astro reserves the right to modify, suspend, or discontinue any part of its services at any time. We do not guarantee uninterrupted service and are not liable for downtime.
          </li>
          <li>
            <strong>Liability & Disclaimers</strong>
            <ul className="list-disc pl-6">
              <li>Aero2Astro provides services &quot;as is&quot; without warranties of any kind.</li>
              <li>We are not liable for any indirect, incidental, or consequential damages resulting from service use.</li>
              <li>Users assume all risks associated with the use of gis services and data collected through our platform.</li>
            </ul>
          </li>
          <li>
            <strong>Indemnification</strong> - Users agree to indemnify and hold Aero2Astro harmless from claims, damages, or losses resulting from misuse of the platform or violation of these Terms.
          </li>
          <li>
            <strong>Termination</strong> - Aero2Astro may terminate or suspend your access if you violate these Terms. Users may also terminate their accounts by discontinuing service use.
          </li>
          <li>
            <strong>Governing Law & Dispute Resolution</strong> - These Terms shall be governed by and construed under the laws of [Insert Jurisdiction]. Any disputes shall be resolved through arbitration in Tamil Nadu.
          </li>
          <li>
            <strong>Changes to Terms</strong> - Aero2Astro reserves the right to update these Terms at any time. Continued use of our services constitutes acceptance of the revised Terms.
          </li>
          <li>
            <strong>Contact Information</strong>
            <ul className="list-disc pl-6">
              <li>Email: flywithus@aero2astro.com</li>
              <li>Phone: +91 6006535445</li>
              <li>Address: HTBI & HEIC, HITS, OMR, PADUR, CHENNAI-603103</li>
            </ul>
          </li>
        </ol>
      </main>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
