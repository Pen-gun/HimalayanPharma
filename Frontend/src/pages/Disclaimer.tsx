import { useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';

const Disclaimer = () => {
  useEffect(() => {
    document.title = 'Disclaimer | Himalayan Pharma Works';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="section-shell space-y-10 py-10">
      <SectionHeader
        eyebrow="Legal"
        title="Disclaimer"
        subtitle="Important information about the use of our products and website"
        align="center"
      />

      <div className="mx-auto max-w-4xl space-y-8 rounded-3xl bg-white p-8 shadow-sm lg:p-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Medical Disclaimer</h2>
          <div className="space-y-3 text-slate-700">
            <p className="font-semibold text-emerald-800">
              IMPORTANT: The information provided on this website and our products is for educational and
              informational purposes only and is not intended as medical advice.
            </p>
            <p>
              Himalayan Pharma Works products are dietary supplements based on traditional Ayurvedic principles
              and herbal formulations. These statements have not been evaluated by the Food and Drug Administration
              or equivalent regulatory bodies. Our products are not intended to diagnose, treat, cure, or prevent
              any disease.
            </p>
            <p>
              Always consult with a qualified healthcare professional before starting any new supplement regimen,
              especially if you:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Are pregnant, nursing, or planning to become pregnant</li>
              <li>Have a pre-existing medical condition</li>
              <li>Are taking prescription medications</li>
              <li>Have allergies to herbs or botanical ingredients</li>
              <li>Are under 18 years of age</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Product Efficacy</h2>
          <p className="text-slate-700">
            While our products are formulated based on traditional Ayurvedic knowledge and supported by available
            clinical research, individual results may vary. The effectiveness of herbal supplements can depend on
            various factors including individual physiology, lifestyle, diet, and consistency of use.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Quality and Safety</h2>
          <p className="text-slate-700">
            All Himalayan Pharma Works products are manufactured in cGMP-certified facilities and undergo rigorous
            quality testing. However, as with any dietary supplement, there is a possibility of allergic reactions
            or interactions with medications. Discontinue use and consult a healthcare provider if you experience
            any adverse reactions.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Website Content</h2>
          <div className="space-y-3 text-slate-700">
            <p>
              The content on this website, including blog posts, articles, and product descriptions, is provided
              for general informational purposes only. We make reasonable efforts to ensure accuracy, but:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Information may become outdated and we do not guarantee its current accuracy</li>
              <li>Content should not replace professional medical advice</li>
              <li>Links to third-party websites are provided for convenience only</li>
              <li>We are not responsible for the content of external websites</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Research and Clinical Studies</h2>
          <p className="text-slate-700">
            References to research studies or clinical trials on this website are for informational purposes.
            Past research results do not guarantee future outcomes. The field of herbal medicine and nutritional
            science is continually evolving, and interpretations of research may vary.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Professional Advice</h2>
          <p className="text-slate-700">
            Nothing on this website should be construed as professional medical, legal, or financial advice.
            Any decisions you make based on information from this website are your sole responsibility. We
            strongly recommend consulting with appropriate professionals for specific advice tailored to your
            individual circumstances.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Testimonials and Reviews</h2>
          <p className="text-slate-700">
            Customer testimonials and reviews reflect individual experiences and are not necessarily representative
            of typical results. Individual results may vary based on many factors. Testimonials are not scientific
            evidence of product efficacy.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Use at Your Own Risk</h2>
          <p className="text-slate-700">
            By using Himalayan Pharma Works products and this website, you acknowledge that you do so at your own
            risk. We are not liable for any adverse effects, injuries, or damages resulting from the use of our
            products or reliance on information provided on this website.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Regulatory Compliance</h2>
          <p className="text-slate-700">
            Our products are manufactured and distributed in compliance with applicable regulations in Nepal.
            Regulatory requirements vary by country. It is your responsibility to ensure compliance with local
            laws and regulations in your jurisdiction.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Changes to Disclaimer</h2>
          <p className="text-slate-700">
            We reserve the right to modify this disclaimer at any time. Continued use of our products or website
            following any changes constitutes acceptance of the updated disclaimer.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-900">Questions and Concerns</h2>
          <p className="text-slate-700">
            If you have questions about this disclaimer or concerns about using our products, please contact us:
          </p>
          <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
            <p className="font-semibold">Himalayan Pharma Works</p>
            <p>Email: info@himalayanpharma.com</p>
            <p>Phone: +977-1-4123456</p>
          </div>
        </section>

        <div className="border-t border-emerald-100 pt-6">
          <p className="text-sm text-slate-600">
            Last Updated: January 1, 2026
          </p>
        </div>

        <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-6">
          <p className="text-sm font-semibold text-amber-900">
            ⚠️ Important: Always consult a healthcare professional before using any dietary supplements,
            especially if you have existing health conditions or are taking medications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
