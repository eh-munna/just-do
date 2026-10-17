'use client';

import { Mail, MapPin } from 'lucide-react';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@justdo.app' },
  { icon: MapPin, label: 'Location', value: 'Remote' },
];

export default function Contact() {
  return (
    <section id="contact" className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
      <p className="opacity-70 text-lg mb-16 max-w-xl leading-relaxed">
        Have a question or feedback? Fill in the form and we&apos;ll get back to you
        within 24 hours.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label className="block text-sm font-medium opacity-70 mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-xl bg-text/5 border border-text/20 focus:outline-none focus:border-text/50 transition-colors placeholder:opacity-40"
            />
          </div>
          <div>
            <label className="block text-sm font-medium opacity-70 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-text/5 border border-text/20 focus:outline-none focus:border-text/50 transition-colors placeholder:opacity-40"
            />
          </div>
          <div>
            <label className="block text-sm font-medium opacity-70 mb-2">
              Message
            </label>
            <textarea
              rows={5}
              placeholder="Tell us what's on your mind..."
              className="w-full px-4 py-3 rounded-xl bg-text/5 border border-text/20 focus:outline-none focus:border-text/50 transition-colors placeholder:opacity-40 resize-none"
            />
          </div>
          <button
            type="submit"
            className="py-3 px-6 bg-text text-bg rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Send Message
          </button>
        </form>

        <div className="flex flex-col gap-6">
          {contactInfo.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-start gap-4 p-5 rounded-2xl border border-text/15 bg-text/5"
            >
              <Icon size={22} strokeWidth={1.5} className="mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">{label}</p>
                <p className="opacity-60 text-sm mt-1">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
