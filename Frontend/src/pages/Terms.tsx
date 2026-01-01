import { useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';

const Terms = () => {
  useEffect(() => {
    document.title = 'Terms & Conditions | Himalayan Pharma Works';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="section-shell space-y-10 py-10">
      <SectionHeader
        eyebrow="Legal"
        title="Terms & Conditions"
        subtitle="Please read these terms carefully before using our services"
        align="center"
      />

      <div className="mx-auto max-w-4xl space-y-8 rounded-3xl bg-white p-8 shadow-sm lg:p-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Acceptance of Terms</h2>
          <p className="text-slate-700">
            By accessing and using the Himalayan Pharma Works website and services, you accept and agree to be
            bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Use of Products</h2>
          <div className="space-y-3 text-slate-700">
            <p>Our herbal and Ayurvedic products are intended to support wellness and health. You agree to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Use products only as directed on the packaging or as advised by a healthcare professional</li>
              <li>Consult with a qualified healthcare provider before starting any new supplement regimen</li>
              <li>Discontinue use and seek medical attention if you experience adverse reactions</li>
              <li>Not use our products as a substitute for professional medical advice or treatment</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Product Information</h2>
          <p className="text-slate-700">
            While we strive to provide accurate product information, we do not warrant that product descriptions,
            pricing, or other content is accurate, complete, reliable, current, or error-free. We reserve the
            right to correct errors and update information at any time without prior notice.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Orders and Payments</h2>
          <div className="space-y-3 text-slate-700">
            <p>When placing an order with us:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>All orders are subject to acceptance and availability</li>
              <li>We reserve the right to refuse or cancel any order for any reason</li>
              <li>Prices are subject to change without notice</li>
              <li>Payment must be received before order fulfillment</li>
              <li>You are responsible for providing accurate shipping information</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Shipping and Delivery</h2>
          <p className="text-slate-700">
            Shipping times are estimates and not guaranteed. We are not liable for delays caused by shipping
            carriers, customs, or events beyond our control. Risk of loss passes to you upon delivery to the carrier.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Returns and Refunds</h2>
          <p className="text-slate-700">
            We accept returns of unopened products within 30 days of purchase. Opened products may be returned
            only if defective. Refunds will be issued to the original payment method. Shipping costs are non-refundable
            unless the return is due to our error.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Intellectual Property</h2>
          <p className="text-slate-700">
            All content on this website, including text, graphics, logos, images, and software, is the property
            of Himalayan Pharma Works and protected by copyright and trademark laws. You may not reproduce,
            distribute, or create derivative works without our express written permission.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Limitation of Liability</h2>
          <p className="text-slate-700">
            To the maximum extent permitted by law, Himalayan Pharma Works shall not be liable for any indirect,
            incidental, special, or consequential damages arising from the use of our products or services. Our
            total liability shall not exceed the amount you paid for the product or service in question.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Indemnification</h2>
          <p className="text-slate-700">
            You agree to indemnify and hold Himalayan Pharma Works harmless from any claims, damages, or expenses
            arising from your use of our products or services, your violation of these terms, or your violation
            of any rights of another party.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Governing Law</h2>
          <p className="text-slate-700">
            These Terms and Conditions are governed by the laws of Nepal. Any disputes shall be resolved in the
            courts of Kathmandu, Nepal.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Changes to Terms</h2>
          <p className="text-slate-700">
            We reserve the right to modify these Terms and Conditions at any time. Changes will be effective
            immediately upon posting to the website. Your continued use of our services constitutes acceptance
            of the updated terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Contact Information</h2>
          <p className="text-slate-700">
            For questions about these Terms and Conditions, please contact us:
          </p>
          <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
            <p className="font-semibold">Himalayan Pharma Works</p>
            <p>Email: legal@himalayanpharma.com</p>
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

export default Terms;
