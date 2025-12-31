import { useEffect, useState } from 'react';
import { contactLocations } from '../data/mockData';
import SectionHeader from '../components/SectionHeader';

const Contact = () => {
  useEffect(() => {
    document.title = 'Contact | Himalayan Pharma Works';
  }, []);
  const handelSubmit = () => {
    alert(`Thank you, ${form.fullName}! We have received your message and will get back to you at ${form.email} soon.`);
  }
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  return (
    <div className="section-shell space-y-10">
      <SectionHeader
        eyebrow="Contact"
        title="We would love to hear from you"
        subtitle="Reach out for clinical information, partnerships, or wellness guidance."
        align="center"
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h3 className="text-xl font-semibold text-emerald-900">Send us a note</h3>
          <p className="mt-2 text-sm text-slate-700">We will contact you shortly.</p>
          <form className="mt-4 space-y-4">
            <input
              className="w-full rounded-xl border border-emerald-100 px-4 py-3 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
              placeholder="Full name"
              aria-label="Full name"
              onChange={(e) => setForm({...form, fullName: e.target.value})}
              name="fullName"
              autoFocus
            />
            <input
              className="w-full rounded-xl border border-emerald-100 px-4 py-3 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
              placeholder="Email"
              type="email"
              aria-label="Email"
              onChange={(e) => setForm({...form, email: e.target.value})}
              name="email"
            />
            <textarea
              className="w-full rounded-xl border border-emerald-100 px-4 py-3 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
              rows={4}
              placeholder="How can we help?"
              aria-label="Message"
              onChange={(e) => setForm({...form, message: e.target.value})}
              name="message"
            />
            <button type="button" className="btn-primary w-full" onClick={() => handelSubmit()}>
              Submit
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4 rounded-3xl bg-white p-6 shadow-sm">
            {contactLocations.map((loc) => (
              <div key={loc.office} className="space-y-1">
                <div className="text-sm font-semibold text-emerald-800">{loc.office}</div>
                <p className="text-sm text-slate-700">{loc.address}</p>
                <p className="text-sm text-slate-700">{loc.phone}</p>
                <p className="text-sm text-slate-700">{loc.email}</p>
              </div>
            ))}
          </div>
          <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-700 to-teal-700 p-6 text-white shadow-sm">
            <h4 className="text-lg font-semibold">Find us</h4>
            <p className="mt-2 text-sm text-emerald-50">Interactive map coming soon. We serve 90 markets with regional warehouses for faster delivery.</p>
            <div className="mt-4 h-48 rounded-2xl bg-emerald-900/20" aria-label="Map placeholder" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
