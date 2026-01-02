import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const footerLinks = {
  company: [
    { label: 'About', to: '/about' },
    { label: 'Science', to: '/science' },
    { label: 'Commitments', to: '/commitments' },
    { label: 'Careers', to: '/careers' },
  ],
  products: [
    { label: 'All Products', to: '/products' },
    { label: 'Pharmaceuticals', to: '/products?category=Pharmaceuticals' },
    { label: 'Personal Care', to: '/products?category=Personal+Care' },
    { label: 'Baby Care', to: '/products?category=Baby+Care' },
  ],
  support: [
    { label: 'Contact', to: '/contact' },
    { label: 'Privacy', to: '/privacy' },
    { label: 'Terms', to: '/terms' },
    { label: 'Disclaimer', to: '/disclaimer' },
  ],
};

const social = [
  { icon: Facebook, label: 'Facebook', to: 'https://facebook.com' },
  { icon: Twitter, label: 'Twitter', to: 'https://twitter.com' },
  { icon: Instagram, label: 'Instagram', to: 'https://instagram.com' },
  { icon: Linkedin, label: 'LinkedIn', to: 'https://linkedin.com' },
];

const Footer = () => {
  return (
    <footer className="border-t border-emerald-100 bg-white/90 backdrop-blur">
      <div className="section-shell grid gap-10 py-12 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-bold text-emerald-800">
            <span className="flex h-10 w-10 items-center justify-center rounded-[0_1rem_0_1rem] bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
              <img src='/HimalayanPharma.jpeg' className="overflow-hidden h-8 w-8 rounded-[0_1rem_0_1rem]" />
            </span>
            <div className="leading-tight">
            <div className='text-emerald-700'>Himalayan</div>
            <div className="text-xs font-medium text-yellow-500">Pharma Works</div>
          </div>
        
          </div>
          <p className="text-sm text-slate-600">
            Ayurveda-inspired, science-backed formulations for holistic wellbeing—crafted with respect for the Himalayas and the communities we partner with.
          </p>
          <div className="flex items-center gap-3">
            {social.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                aria-label={item.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-100 text-emerald-800 transition hover:-translate-y-0.5 hover:border-emerald-500 hover:text-emerald-700"
              >
                <item.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-emerald-700">Company</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            {footerLinks.company.map((link) => (
              <li key={link.label}>
                <Link className="hover:text-emerald-700" to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-emerald-700">Products</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            {footerLinks.products.map((link) => (
              <li key={link.label}>
                <Link className="hover:text-emerald-700" to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-emerald-700">Support</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            {footerLinks.support.map((link) => (
              <li key={link.label}>
                <Link className="hover:text-emerald-700" to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-slate-500">© {new Date().getFullYear()} Himalayan Pharma Works. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
