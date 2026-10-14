import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import Card from '../components/Card';

export default function Home() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `https://jsonplaceholder.typicode.com/users`;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section id="home" className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Just Do It</h1>
        <p className="text-lg md:text-xl opacity-80 max-w-2xl">
          A modern Product Displaying Platform.
        </p>
      </section>

      <section>
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Our Happy Clients
          </h2>

          {error ? (
            <p>Error: {error}</p>
          ) : loading ? (
            <Loader
              size={20}
              fill={loading ? 'currentColor' : 'none'}
              strokeWidth={1.5}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {members.map((user, index) => (
                <Card key={index} name={user.name} email={user.email} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
