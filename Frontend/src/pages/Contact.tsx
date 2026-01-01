import { useEffect, useState, useCallback, useRef, memo} from 'react';
import { contactLocations } from '../data/mockData';
import SectionHeader from '../components/SectionHeader';
import { useContact } from '../hooks/useContact.ts';

const ContactLocation = memo(({ location }: { location: typeof contactLocations[0] }) => (
  <div className="space-y-1">
    <div className="text-sm font-semibold text-emerald-800">{location.office}</div>
    <p className="text-sm text-slate-700">{location.address}</p>
    <p className="text-sm text-slate-700">{location.phone}</p>
    <p className="text-sm text-slate-700">{location.email}</p>
  </div>
));

ContactLocation.displayName = 'ContactLocation';

const Contact = () => {
  const { mutate: sendMessage, isPending } = useContact();
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    document.title = 'Contact | Himalayan Pharma Works';
  }, []);
  
  // Lazy load map when it comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setMapLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );
    
    if (mapContainerRef.current) {
      observer.observe(mapContainerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    message: ''
  });
  
  const handelSubmit = useCallback(() => {
    if(!form.fullName || !form.email || !form.message) {
      alert('Please fill all fields');
      return;
    }
    sendMessage(form, {
      onSuccess: () => {
        alert('Message sent successfully');
        setForm({
          fullName: '',
          email: '',
          message: ''
        });
      },
      onError: () => {
        alert('Failed to send message. Please try again later.');
      }
    });
  }, [form, sendMessage]);

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
          <form className="mt-4 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handelSubmit();
          }}
          >
            <input
              className="w-full rounded-xl border border-emerald-100 px-4 py-3 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
              placeholder="Full name"
              aria-label="Full name"
              onChange={(e) => setForm({...form, fullName: e.target.value})}
              name="fullName"
              autoFocus
              value={form.fullName}
            />
            <input
              className="w-full rounded-xl border border-emerald-100 px-4 py-3 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
              placeholder="Email"
              type="email"
              aria-label="Email"
              onChange={(e) => setForm({...form, email: e.target.value})}
              name="email"
              value={form.email}
            />
            <textarea
              className="w-full rounded-xl border border-emerald-100 px-4 py-3 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
              rows={4}
              placeholder="How can we help?"
              aria-label="Message"
              onChange={(e) => setForm({...form, message: e.target.value})}
              name="message"
              value={form.message}
            />
            <button type="submit" className="btn-primary w-full" disabled={isPending}>
              {isPending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4 rounded-3xl bg-white p-6 shadow-sm">
            {contactLocations.map((loc) => (
              <ContactLocation key={loc.office} location={loc} />
            ))}
          </div>
          <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-700 to-teal-700 p-6 text-white shadow-sm">
            <h4 className="text-lg font-semibold">Find us</h4>
            <p className="mt-2 text-sm text-emerald-50">We serve 90 markets with regional warehouses for faster delivery.</p>
            <div 
              ref={mapContainerRef}
              className="mt-4 h-48 rounded-2xl bg-emerald-900/20 overflow-hidden" 
              aria-label="Map placeholder"
              style={{ touchAction: 'pan-y pinch-zoom' }}
            >
              {mapLoaded ? (
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17671.931461845477!2d85.3593855068111!3d27.68678176700341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1a266b342bc5%3A0x73bbfa829a89af1b!2sTribhuvan%20International%20Airport!5e0!3m2!1sen!2snp!4v1767281826912!5m2!1sen!2snp" 
                  loading="lazy" 
                  className="h-full w-full border-0" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location Map"
                  allow=""
                  style={{ touchAction: 'pan-y pinch-zoom' }}
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-emerald-100 text-sm">
                  Loading map...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
