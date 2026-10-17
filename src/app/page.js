export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-4xl font-bold">Welcome to just-do</h1>
        <p className="mt-2 text-lg opacity-70">
          A simple app to get things done.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold">Tasks</h2>
          <p className="mt-1 text-sm opacity-60">Manage your daily tasks.</p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold">Notes</h2>
          <p className="mt-1 text-sm opacity-60">Jot down quick notes.</p>
        </div>
      </div>
    </div>
  );
}
