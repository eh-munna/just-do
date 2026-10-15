import { CloudSun, Globe, Users, Zap } from 'lucide-react';

const team = [
  { name: 'Alex Rivera', role: 'Founder & CEO', initials: 'AR' },
  { name: 'Sam Chen', role: 'Lead Engineer', initials: 'SC' },
  { name: 'Jordan Lee', role: 'UX Designer', initials: 'JL' },
];

const values = [
  {
    icon: Zap,
    title: 'Speed',
    desc: 'We believe weather data should reach you instantly, without fluff.',
  },
  {
    icon: Globe,
    title: 'Accuracy',
    desc: 'We source from trusted meteorological services worldwide.',
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
      <div className="flex items-center gap-4 mb-4">
        <CloudSun size={40} strokeWidth={1.5} />
        <h1 className="text-4xl md:text-5xl font-bold">About Us</h1>
      </div>
      <p className="opacity-70 text-lg max-w-2xl mb-16 leading-relaxed">
        WeatherGlance was built by a small team of developers who wanted a
        no-nonsense weather app. No ads, no clutter — just the data you need.
      </p>

      <h2 className="text-2xl font-bold mb-6">Our Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
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

      <h2 className="text-2xl font-bold mb-6">The Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {team.map((member) => (
          <div
            key={member.name}
            className="p-6 rounded-2xl border border-text/15 bg-text/5 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-text text-bg flex items-center justify-center font-bold text-sm shrink-0">
              {member.initials}
            </div>
            <div>
              <p className="font-semibold">{member.name}</p>
              <p className="opacity-60 text-sm">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
