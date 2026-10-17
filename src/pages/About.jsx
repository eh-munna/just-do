import { Globe, Users, Zap } from 'lucide-react';

const values = [
  {
    icon: Zap,
    title: 'Speed',
    desc: 'We believe tools should be fast and get out of your way.',
  },
  {
    icon: Globe,
    title: 'Reliability',
    desc: 'Built to be dependable for your everyday tasks.',
  },
  {
    icon: Users,
    title: 'Simplicity',
    desc: 'Clean interfaces that anyone can use without a manual.',
  },
];

export default function About() {
  return (
    <section id="about" className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
      <p className="opacity-70 text-lg max-w-2xl mb-16 leading-relaxed">
        Just Do is built for people who want to get things done — no clutter,
        no distractions, just a clean and focused experience.
      </p>

      <h2 className="text-2xl font-bold mb-6">Our Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {values.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="p-6 rounded-2xl border border-text/15 bg-text/5"
          >
            <Icon size={28} strokeWidth={1.5} className="mb-3" />
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="opacity-60 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
