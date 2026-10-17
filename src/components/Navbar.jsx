'use client';

import { Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '../hooks/useTheme';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Users', href: '/users' },
    { label: 'Posts', href: '/posts' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
  ];

  return (
    <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
      <Link
        href="/"
        className="text-2xl font-bold hover:opacity-80 transition-opacity"
      >
        Just Do
      </Link>

      <div className="flex items-center gap-6">
        {navLinks.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            {label}
          </Link>
        ))}

        <button
          onClick={toggleTheme}
          className="cursor-pointer p-2 rounded-lg hover:bg-text/10 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === null ? null : theme === 'dark' ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>
      </div>
    </nav>
  );
}
