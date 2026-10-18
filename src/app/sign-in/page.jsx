'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signIn } from '../../lib/auth-client';

export default function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { error: authError } = await signIn.email({
        email: form.email,
        password: form.password,
        callbackURL: '/',
      });
      if (authError) {
        setError(
          authError.message ?? 'Something went wrong. Please try again.',
        );
        return;
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex flex-col items-center justify-center py-16">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-2">Welcome back</h1>
        <p className="opacity-70 text-lg mb-10">Sign in to your account.</p>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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
            <input
              name="password"
              type="password"
              placeholder="Your password"
              value={form.password}
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
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="mt-8 text-sm opacity-60 text-center">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="underline opacity-100 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}
