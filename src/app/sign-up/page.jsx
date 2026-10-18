'use client';

import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { signUp } from '../../lib/auth-client';

export default function SignUp() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const { error: authError } = await signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        callbackURL: '/sign-in',
      });

      if (authError) {
        setError(
          authError.message ?? 'Something went wrong. Please try again.',
        );
        return;
      }

      router.push('/sign-in');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex flex-col items-center justify-center py-16">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-2">Create account</h1>
        <p className="opacity-70 text-lg mb-10">
          Sign up to start getting things done.
        </p>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium opacity-70 mb-2">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-text/5 border border-text/20 focus:outline-none focus:border-text/50 transition-colors placeholder:opacity-40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium opacity-70 mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-text/5 border border-text/20 focus:outline-none focus:border-text/50 transition-colors placeholder:opacity-40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium opacity-70 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={isVisible ? 'text' : 'password'}
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={8}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-text/5 border border-text/20 focus:outline-none focus:border-text/50 transition-colors placeholder:opacity-40"
              />
              <button
                type="button"
                onClick={handleVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 opacity-40 hover:opacity-80 transition-opacity"
                aria-label={isVisible ? 'Hide password' : 'Show password'}
              >
                {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium opacity-70 mb-2">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Repeat your password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-text/5 border border-text/20 focus:outline-none focus:border-text/50 transition-colors placeholder:opacity-40"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="py-3 px-6 bg-text text-bg rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account…' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-8 text-sm opacity-60 text-center">
          Already have an account?{' '}
          <Link href="/sign-in" className="underline opacity-100 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
