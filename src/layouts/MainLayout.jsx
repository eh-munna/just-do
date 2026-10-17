import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 pt-16 mt-4 min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
