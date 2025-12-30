import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/70 via-white to-emerald-50">
      <Navbar />
      <main className="relative z-0 pt-24 pb-14">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
