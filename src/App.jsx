import Clock from './components/Clock';
import Contact from './components/Contact';
import Counter from './components/Counter';
import Header from './components/Header';
import Home from './pages/Home';
import CounterProvider from './providers/CounterProvider';

export default function App() {
  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen">
        {/* Home Section */}
        <Home />
        <CounterProvider>
          <Counter />
        </CounterProvider>
        {/* Contact Section */}
        <Clock />
        <Contact />
      </main>
    </>
  );
}
