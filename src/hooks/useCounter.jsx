// import { useContext } from 'react';
import { use } from 'react';
import { CounterContext } from '../contexts/CounterContext';

export const useCounter = () => {
  //   const { count, increment, decrement } = useContext(CounterContext);
  const context = use(CounterContext);

  if (context === null) {
    throw new Error('useCounter must be used within CounterProvider');
  }

  const { count, increment, decrement } = context;

  return { count, increment, decrement };
};
