export default function Home() {
  return (
    <section
      id="home"
      className="container mx-auto px-4 py-24 flex flex-col items-center text-center min-h-[calc(100vh-4rem)]"
    >
      <div className="mb-8 p-6 rounded-full bg-text/10">
        <span className="text-6xl">✓</span>
      </div>

      <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
        Just Do
      </h1>

      <p className="text-lg md:text-xl opacity-70 max-w-xl leading-relaxed">
        A simple, clean productivity app. More coming soon.
      </p>
    </section>
  );
}
