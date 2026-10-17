import { use } from 'react';

export default function Post({ res }) {
  const posts = use(res);

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="border rounded-lg p-4 shadow-sm">
          <span className="text-xs text-gray-400">#{post.id}</span>
          <h2 className="text-lg font-semibold capitalize mt-1">{post.title}</h2>
          <p className="text-gray-600 mt-2 text-sm">{post.body}</p>
        </div>
      ))}
    </div>
  );
}
