'use client';
import { Building2, Globe, Mail, MapPin, Phone } from 'lucide-react';

import { ArrowLeft } from 'lucide-react';

export default function UserProfile({ user }) {
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <section className="container mx-auto px-4 py-16 max-w-2xl">
      <button
        onClick={() => console.log(user)}
        className="flex items-center gap-2 mb-8 px-4 py-2 rounded-xl border border-text/20 opacity-60 hover:opacity-100 hover:bg-text/10 transition-all cursor-pointer"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="flex flex-col gap-6">
        {/* Avatar + identity */}
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-text text-bg flex items-center justify-center font-bold text-2xl shrink-0">
            {initials}
          </div>
          <div>
            <h2 className="text-3xl font-bold">{user?.name}</h2>
            <p className="opacity-50 mt-1">@{user?.username}</p>
          </div>
        </div>

        {/* Contact */}
        <div className="p-6 rounded-2xl border border-text/15 bg-text/5">
          <h3 className="font-semibold mb-4">Contact</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-sm opacity-70">
              <Mail size={15} className="shrink-0" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm opacity-70">
              <Phone size={15} className="shrink-0" />
              <span>{user?.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm opacity-70">
              <Globe size={15} className="shrink-0" />
              <span>{user?.website}</span>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="p-6 rounded-2xl border border-text/15 bg-text/5">
          <h3 className="font-semibold mb-4">Address</h3>
          <div className="flex items-start gap-3 text-sm opacity-70">
            <MapPin size={15} className="shrink-0 mt-0.5" />
            <span>
              {user.address?.suite}, {user.address?.street}
              <br />
              {user.address?.city}, {user.address?.zipcode}
            </span>
          </div>
        </div>

        {/* Company */}
        <div className="p-6 rounded-2xl border border-text/15 bg-text/5">
          <h3 className="font-semibold mb-4">Company</h3>
          <div className="flex items-start gap-3">
            <Building2 size={15} className="shrink-0 mt-0.5 opacity-70" />
            <div className="flex flex-col gap-1">
              <span className="font-medium">{user.company?.name}</span>
              <span className="text-sm opacity-50 italic">
                &quot;{user.company?.catchPhrase}&quot;
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
