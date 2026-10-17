import { Suspense } from 'react';
import Post from '../../components/Post';
import PostSkeleton from '../../components/PostSkeleton';

export default function Posts() {
  const res = fetch('https://jsonplaceholder.typicode.com/posts').then((r) =>
    r.json(),
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Suspense fallback={<PostSkeleton />}>
        <Post res={res} />
      </Suspense>
    </div>
  );
}
