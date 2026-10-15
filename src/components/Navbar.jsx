import { Link } from 'react-router';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Weather', href: '/weather' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold hover:opacity-80 transition-opacity">WeatherGlance</Link>

      <div className="flex items-center gap-8">
        {navLinks.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            {label}
          </a>
        ))}

        <button
          onClick={toggleTheme}
          className="cursor-pointer p-2 rounded-lg hover:bg-text/10 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
}
