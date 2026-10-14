import { useCounter } from '../hooks/useCounter';

export default function Display() {
  const { count } = useCounter();
  return <div className="text-6xl font-bold">{count}
  
  
  

  </div>;
}
