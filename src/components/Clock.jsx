import { useEffect, useState } from 'react';

export default function Clock() {
  const [totalSeconds, setTotalSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center gap-6">
        <div className="rounded-xl border border-text/10 bg-text/5 px-8 py-6">
          <span className="text-5xl font-bold tabular-nums">
            {pad(hours)}:{pad(minutes)}:{pad(seconds)}
          </span>
        </div>
        <p className="opacity-80">
          {pad(hours)} hours, {pad(minutes)} minutes, {pad(seconds)} seconds
        </p>
      </div>
    </section>
  );
}