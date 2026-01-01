import { useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';

const Privacy = () => {
  useEffect(() => {
    document.title = 'Privacy Policy | Himalayan Pharma Works';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="section-shell space-y-10 py-10 ">
      <SectionHeader
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your personal information"
        align="center"
      />

      <div className="mx-auto max-w-4xl space-y-8 rounded-3xl bg-white p-8 shadow-sm lg:p-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Information We Collect</h2>
          <div className="space-y-3 text-slate-700">
            <p>
              At Himalayan Pharma Works, we collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Name, email address, and contact information when you fill out forms</li>
              <li>Purchase history and product preferences</li>
              <li>Communications with our customer service team</li>
              <li>Account credentials if you create an account</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">How We Use Your Information</h2>
          <div className="space-y-3 text-slate-700">
            <p>We use the information we collect to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about products, services, and promotions</li>
              <li>Improve our products and services</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Comply with legal obligations and protect our rights</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Data Security</h2>
          <p className="text-slate-700">
            We implement appropriate technical and organizational measures to protect your personal information
            against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission
            is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Cookies and Tracking</h2>
          <p className="text-slate-700">
            We use cookies and similar tracking technologies to enhance your browsing experience, analyze site
            traffic, and understand user preferences. You can control cookie settings through your browser preferences.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Third-Party Sharing</h2>
          <p className="text-slate-700">
            We do not sell your personal information to third parties. We may share information with trusted
            service providers who assist us in operating our website and conducting our business, provided they
            agree to keep this information confidential.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Your Rights</h2>
          <div className="space-y-3 text-slate-700">
            <p>You have the right to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Access and receive a copy of your personal data</li>
              <li>Request correction of inaccurate or incomplete data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict certain processing of your data</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Children's Privacy</h2>
          <p className="text-slate-700">
            Our services are not directed to individuals under the age of 18. We do not knowingly collect
            personal information from children. If you believe we have collected information from a child,
            please contact us immediately.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Changes to This Policy</h2>
          <p className="text-slate-700">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting
            the new policy on this page and updating the "Last Updated" date below.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Contact Us</h2>
          <p className="text-slate-700">
            If you have questions about this Privacy Policy or our data practices, please contact us at:
          </p>
          <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
            <p className="font-semibold">Himalayan Pharma Works</p>
            <p>Email: privacy@himalayanpharma.com</p>
            <p>Phone: +977-1-4123456</p>
          </div>
        </section>

        <div className="border-t border-emerald-100 pt-6">
          <p className="text-sm text-slate-600">
            Last Updated: January 1, 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
