import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

export default function Card({ name, email }) {
  // --- Single status state approach (inactive) ---
  // const [reaction, setReaction] = useState('none'); // 'none' | 'liked' | 'disliked'
  // const liked = reaction === 'liked';
  // const disliked = reaction === 'disliked';
  // const handleLike = () => setReaction(liked ? 'none' : 'liked');
  // const handleDislike = () => setReaction(disliked ? 'none' : 'disliked');

  // --- Numeric state approach (active) ---
  const [reaction, setReaction] = useState(0); // 0 = none, 1 = liked, -1 = disliked

  const liked = reaction === 1;
  const disliked = reaction === -1;

  console.log(liked, disliked);

  const handleLike = () => setReaction(liked ? 0 : 1);
  const handleDislike = () => setReaction(disliked ? 0 : -1);

  const initials = name
    ? name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .toUpperCase()
    : '?';

  return (
    <div className="rounded-xl border border-text/10 bg-text/5 p-6 transition-colors duration-250 hover:bg-text/10">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-text text-base font-bold text-bg">
        {initials}
      </div>
      <h3 className="mb-1 text-xl font-semibold">{name}</h3>
      <p className="opacity-80">Email: {email.toLowerCase()}</p>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={handleLike}
          aria-label="Like"
          aria-pressed={liked}
          className={`cursor-pointer rounded-lg p-2 transition-colors ${
            liked
              ? 'bg-text/10 text-text'
              : 'opacity-60 hover:bg-text/10 hover:opacity-100'
          }`}
        >
          <ThumbsUp
            size={20}
            fill={liked ? 'currentColor' : 'none'}
            strokeWidth={1.5}
          />
        </button>

        <button
          type="button"
          onClick={handleDislike}
          aria-label="Dislike"
          aria-pressed={disliked}
          className={`cursor-pointer rounded-lg p-2 transition-colors ${
            disliked
              ? 'bg-text/10 text-text'
              : 'opacity-60 hover:bg-text/10 hover:opacity-100'
          }`}
        >
          <ThumbsDown
            size={20}
            fill={disliked ? 'currentColor' : 'none'}
            strokeWidth={1.5}
          />
        </button>
      </div>
    </div>
  );
}
