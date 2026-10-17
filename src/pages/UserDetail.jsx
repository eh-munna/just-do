import { ArrowLeft } from 'lucide-react';
import { useLoaderData, useNavigate } from 'react-router';
import UserProfile from '../components/UserProfile';

export default function UserDetail() {
  const user = useLoaderData();
  const navigate = useNavigate();

  return (
    <section className="container mx-auto px-4 py-16 max-w-2xl">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-8 px-4 py-2 rounded-xl border border-text/20 opacity-60 hover:opacity-100 hover:bg-text/10 transition-all cursor-pointer"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <UserProfile user={user} />
    </section>
  );
}
