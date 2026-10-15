import { AlertCircle, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { getGeocoding } from '../utils/getGeocoding';

export default function Modal({ onClose }) {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (city.trim()) {
      try {
        setLoading(true);
        const result = await getGeocoding(city);
        if (result) return navigate('/weather', { state: { city: result } });
        setError('City not found. Please try again.');
      } catch {
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-bg border border-text/20 rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Search City</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-text/10 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium opacity-70 mb-2"
            >
              Enter city name
            </label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setError(null);
              }}
              placeholder="e.g. London, Tokyo, New York..."
              autoFocus
              className="w-full px-4 py-3 rounded-xl bg-text/5 border border-text/20 focus:outline-none focus:border-text/50 transition-colors placeholder:opacity-40"
            />
          </div>
          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-text/5 border border-text/20 text-sm">
              <AlertCircle size={16} className="shrink-0 opacity-60" />
              <span className="opacity-80">{error}</span>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-text text-bg rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Check Weather'}
          </button>
        </form>
      </div>
    </div>
  );
}
