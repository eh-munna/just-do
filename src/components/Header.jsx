import Navbar from './Navbar';

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-bg text-text border-b border-text/10 z-50 transition-colors duration-250">
      <Navbar />
    </header>
  );
}
