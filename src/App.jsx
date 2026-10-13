import Contact from './components/Contact';
import Header from './components/Header';
import Home from './pages/Home';

export default function App() {
  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen">
        {/* Home Section */}
        <Home />
        {/* Contact Section */}
        <Contact />
      </main>
    </>
  );
}
