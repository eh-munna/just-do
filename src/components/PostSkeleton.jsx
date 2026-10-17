export default function PostSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="border rounded-lg p-4 shadow-sm animate-pulse">
          <div className="h-3 w-8 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
          <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
          <div className="space-y-2">
            <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
