import { Moon, Sun } from 'lucide-react';
import { NavLink } from 'react-router';
import { useTheme } from '../hooks/useTheme';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Users', href: '/users' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
      <NavLink
        to="/"
        className="text-2xl font-bold hover:opacity-80 transition-opacity"
      >
        Just Do
      </NavLink>

      <div className="flex items-center gap-8">
        {navLinks.map(({ label, href }) => (
          <NavLink
            key={href}
            to={href}
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            {label}
          </NavLink>
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
