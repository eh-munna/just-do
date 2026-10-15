import {
  AlertCircle,
  ArrowLeft,
  Cloud,
  Droplets,
  Eye,
  Gauge,
  Search,
  Thermometer,
  Wind,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Modal from '../components/Modal';
import StatCard from '../components/StatCard';
import { getWeather } from '../utils/getWeather';

export default function Weather() {
  const [modalOpen, setModalOpen] = useState(false);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const city = location.state?.city;
  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true);
        setError(null);

        if (!city) {
          setError('No city selected.');
          return;
        }

        const data = await getWeather(city);
        setWeather(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch weather');
      } finally {
        setLoading(false);
        setModalOpen(false);
      }
    }

    fetchWeather();
  }, [city]);

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="rounded-3xl border border-text/15 bg-text/5 p-8">
          <div className="flex flex-col gap-4 mb-6">
            <div className="h-10 w-48 rounded-xl bg-text/10 animate-pulse" />
            <div className="h-4 w-32 rounded-lg bg-text/10 animate-pulse" />
          </div>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-16 w-16 rounded-2xl bg-text/10 animate-pulse" />
            <div className="h-16 w-36 rounded-xl bg-text/10 animate-pulse" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-24 rounded-2xl border border-text/15 bg-text/10 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 py-12 max-w-3xl">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 mb-8 opacity-60 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>
        <div className="rounded-3xl border border-text/15 bg-text/5 p-8 flex flex-col items-center gap-4 text-center">
          <AlertCircle size={40} className="opacity-40" />
          <h2 className="text-xl font-semibold">Something went wrong</h2>
          <p className="opacity-60">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-2 flex items-center gap-2 px-6 py-3 bg-text text-bg rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            <Search size={18} />
            Search a City
          </button>
        </div>
      </section>
    );
  }

  if (!weather) {
    return (
      <section className="container mx-auto px-4 py-12 max-w-3xl">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 mb-8 opacity-60 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>
        <div className="rounded-3xl border border-text/15 bg-text/5 p-8 flex flex-col items-center gap-4 text-center">
          <Cloud size={40} className="opacity-40" />
          <h2 className="text-xl font-semibold">No weather data available</h2>
          <p className="opacity-60">Try searching for a different city.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-2 flex items-center gap-2 px-6 py-3 bg-text text-bg rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            <Search size={18} />
            Search a City
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 mb-8 opacity-60 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>

        {/* Main weather card */}
        <div className="rounded-3xl border border-text/15 bg-text/5 p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold">
                {weather.city}, {weather.country}
              </h1>
              <p className="opacity-60 mt-1">{weather.description}</p>
            </div>
            <div className="flex flex-col items-start md:items-end">
              <div className="flex items-center gap-2">
                <Cloud size={32} strokeWidth={1.5} />
                <span className="text-6xl font-bold">{weather.temp}°C</span>
              </div>
              <span className="opacity-60 mt-1">{weather.condition}</span>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <StatCard
              icon={Thermometer}
              label="Feels Like"
              value={`${weather.feelsLike}°C`}
            />
            <StatCard
              icon={Droplets}
              label="Humidity"
              value={`${weather.humidity}%`}
            />
            <StatCard
              icon={Wind}
              label="Wind Speed"
              value={`${weather.windSpeed} km/h ${weather.windDir}`}
            />
            <StatCard
              icon={Eye}
              label="Visibility"
              value={`${weather.visibility} km`}
            />
            <StatCard
              icon={Gauge}
              label="Pressure"
              value={`${weather.pressure} hPa`}
            />
            <StatCard icon={Cloud} label="UV Index" value={weather.uvIndex} />
          </div>
        </div>

        {/* Search again button */}
        <div className="flex justify-center">
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-text text-bg rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            <Search size={18} />
            Search Another City
          </button>
        </div>
      </section>

      {modalOpen && <Modal onClose={() => setModalOpen(false)} />}
    </>
  );
}
