import { CloudSun, Search } from 'lucide-react';
import { useState } from 'react';
import Modal from '../components/Modal';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section
        id="home"
        className="container mx-auto px-4 py-24 flex flex-col items-center text-center min-h-[calc(100vh-4rem)]"
      >
        <div className="mb-8 p-6 rounded-full bg-text/10">
          <CloudSun size={64} strokeWidth={1.5} />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Weather at a<br />
          <span className="opacity-60">Glance</span>
        </h1>

        <p className="text-lg md:text-xl opacity-70 max-w-xl mb-10 leading-relaxed">
          Enter any city name and get instant weather details — temperature,
          humidity, wind speed, and more. Fast, clean, and simple.
        </p>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-3 px-8 py-4 bg-text text-bg rounded-2xl text-lg font-semibold hover:opacity-90 transition-opacity shadow-lg"
        >
          <Search size={20} />
          Search City Weather
        </button>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl text-left">
          {[
            { label: 'Real-time Data', desc: 'Up-to-date weather conditions for any city worldwide.' },
            { label: 'Detailed Stats', desc: 'Feels like, humidity, wind speed, visibility & more.' },
            { label: 'Any City', desc: 'Search thousands of cities across all continents.' },
          ].map((item) => (
            <div key={item.label} className="p-6 rounded-2xl border border-text/15 bg-text/5">
              <h3 className="font-bold text-lg mb-2">{item.label}</h3>
              <p className="opacity-60 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {modalOpen && <Modal onClose={() => setModalOpen(false)} />}
    </>
  );
}
