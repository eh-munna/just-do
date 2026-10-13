import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setFormData({ name: '', subject: '', message: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputClass =
    'w-full px-4 py-3 rounded-lg border border-text/20 bg-text/5 text-text placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-text/40 transition-colors';

  return (
    <section id="contact" className="container mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-5xl font-bold mb-6">Contact</h2>
      <p className="text-lg opacity-80 mb-8 max-w-2xl">
        Have a question or want to work together? Fill out the form below and
        I&#39;ll get back to you.
      </p>

      {submitted && (
        <p className="mb-6 font-medium">Message sent successfully!</p>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="subject" className="block mb-2 font-medium">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What is this about?"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-2 font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message..."
            rows={6}
            required
            className={`${inputClass} resize-y`}
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-lg bg-text text-bg font-semibold cursor-pointer hover:opacity-90 transition-opacity"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
