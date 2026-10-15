const sections = [
  {
    title: '1. Information We Collect',
    body: 'We collect city names you search for in order to display weather data. We do not collect any personally identifiable information unless you voluntarily provide it through our contact form.',
  },
  {
    title: '2. How We Use Your Information',
    body: 'Search queries are used solely to fetch and display weather data. Contact form submissions are used only to respond to your inquiry. We do not sell or share your data with third parties for marketing purposes.',
  },
  {
    title: '3. Cookies & Local Storage',
    body: 'We use browser local storage to remember your preferred theme (light or dark mode). No tracking cookies or advertising cookies are used.',
  },
  {
    title: '4. Third-Party Services',
    body: 'Weather data is sourced from third-party meteorological APIs. These services may have their own privacy policies. We encourage you to review them.',
  },
  {
    title: '5. Data Security',
    body: 'We take reasonable measures to protect any information transmitted to our service. However, no method of transmission over the internet is 100% secure.',
  },
  {
    title: '6. Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time. Changes will be reflected by the updated date below. Continued use of our service after changes constitutes acceptance of the new policy.',
  },
  {
    title: '7. Contact',
    body: 'If you have any questions about this Privacy Policy, please reach out to us at hello@weatherglance.io.',
  },
];

export default function Privacy() {
  return (
    <section id="privacy" className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
      <p className="opacity-60 text-sm mb-12">Last updated: October 14, 2026</p>

      <div className="flex flex-col gap-8">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="text-xl font-bold mb-2">{s.title}</h2>
            <p className="opacity-70 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
