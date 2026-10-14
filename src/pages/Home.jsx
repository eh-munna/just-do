import Card from '../components/Card';

export default function Home() {
  const members = [
    { name: 'John Doe', age: 30 },
    { name: 'Jane Smith', age: 25 },
    { name: 'Bob Johnson', age: 35 },
  ];
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {members.map((member, index) => (
              <Card key={index} name={member.name} age={member.age} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
