'use client';

import { Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '../hooks/useTheme';
import { signOut, useSession } from '../lib/auth-client';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { data, isPending } = useSession();
  const router = useRouter();

  const user = data?.user;

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Users', href: '/users' },
    { label: 'Posts', href: '/posts' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
  ];

  const authLinks = [
    { label: 'Sign In', href: '/sign-in' },
    { label: 'Sign Up', href: '/sign-up' },
  ];

  async function handleSignOut() {
    const { error } = await signOut();
    if (error) {
      console.error(error.message);
      return;
    }
    router.push('/');
    router.refresh();
  }

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
            key={label}
            href={href}
            className="hover:opacity-80 transition-opacity"
          >
            {label}
          </Link>
        ))}

        {isPending ? null : user ? (
          <button
            onClick={handleSignOut}
            className="hover:opacity-80 transition-opacity"
          >
            Sign Out
          </button>
        ) : (
          authLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="hover:opacity-80 transition-opacity"
            >
              {label}
            </Link>
          ))
        )}

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
