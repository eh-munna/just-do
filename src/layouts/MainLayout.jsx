import { Outlet } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
