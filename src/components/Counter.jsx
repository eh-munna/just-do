import { useCounter } from '../hooks/useCounter';
import Display from './Display';

export default function Counter() {
  const { count, increment, decrement } = useCounter();
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={decrement}
            className="cursor-pointer rounded-lg border border-text/20 bg-text/5 px-5 py-2.5 text-base font-medium transition-colors hover:bg-text/10"
          >
            Decrement (-)
          </button>
          <button
            type="button"
            onClick={increment}
            className="cursor-pointer rounded-lg border border-text/20 bg-text/5 px-5 py-2.5 text-base font-medium transition-colors hover:bg-text/10"
          >
            Increment (+)
          </button>
        </div>
        <Display count={count} />
      </div>
    </section>
  );
}
