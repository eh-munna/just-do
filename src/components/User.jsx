import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export default function User({ user }) {
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div className="p-6 rounded-2xl border border-text/15 bg-text/5">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-11 h-11 rounded-full bg-text text-bg flex items-center justify-center font-bold text-sm shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold">{user.name}</p>
          <p className="opacity-50 text-sm">@{user.username}</p>
        </div>
        <Link
          href={`/users/${user.id}`}
          className="text-xs opacity-50 hover:opacity-100 border border-text/20 px-3 py-1 rounded-full shrink-0 transition-opacity"
        >
          View
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="flex items-center gap-2 opacity-60 text-sm">
          <Mail size={14} className="shrink-0" />
          <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center gap-2 opacity-60 text-sm">
          <Phone size={14} className="shrink-0" />
          <span className="truncate">{user.phone}</span>
        </div>
        <div className="flex items-center gap-2 opacity-60 text-sm">
          <MapPin size={14} className="shrink-0" />
          <span className="truncate">{user.address.city}</span>
        </div>
        <div className="flex items-center gap-2 opacity-60 text-sm">
          <Globe size={14} className="shrink-0" />
          <span className="truncate">{user.website}</span>
        </div>
      </div>
    </div>
  );
}
