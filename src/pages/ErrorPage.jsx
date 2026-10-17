import { useRouteError, isRouteErrorResponse, Link } from 'react-router';

export default function ErrorPage() {
  const error = useRouteError();

  const is404 =
    isRouteErrorResponse(error) && error.status === 404;

  const status = isRouteErrorResponse(error) ? error.status : null;
  const message = isRouteErrorResponse(error)
    ? error.statusText
    : error instanceof Error
    ? error.message
    : 'Something went wrong';

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-white dark:bg-neutral-950">
      <div className="max-w-md w-full">
        <p className="text-sm font-medium tracking-widest uppercase text-red-500 mb-6">
          {is404 ? 'Page not found' : 'Error'}
        </p>

        <p className="text-8xl font-bold text-neutral-900 dark:text-neutral-100 leading-none mb-4">
          {status ?? '!'}
        </p>

        <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-3">
          {is404 ? "This page doesn't exist" : 'Something went wrong'}
        </h1>

        <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8 leading-relaxed">
          {is404
            ? 'The URL may be mistyped, the page may have moved, or it may have been removed.'
            : message}
        </p>

        <div className="h-px w-10 bg-neutral-200 dark:bg-neutral-700 mb-8" />

        <div className="flex gap-3 flex-wrap">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium hover:opacity-80 transition-opacity"
          >
            Go home
          </Link>
          <button
            onClick={() => history.back()}
            className="px-5 py-2.5 rounded-md border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 text-sm font-medium hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors"
          >
            Go back
          </button>
        </div>

        {status && (
          <code className="mt-10 inline-block text-xs font-mono text-neutral-400 dark:text-neutral-600 bg-neutral-100 dark:bg-neutral-900 px-3 py-2 rounded">
            ERR · {status} · {message.toUpperCase()}
          </code>
        )}
      </div>
    </div>
  );
}
