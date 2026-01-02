import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Leaf, Menu, X, ShoppingCart, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/science', label: 'Science' },
  { to: '/commitments', label: 'Commitments' },
  { to: '/blog', label: 'Blog' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold tracking-tight transition hover:text-emerald-700 ${
      isActive ? 'text-emerald-700' : 'text-slate-800'
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-20 bg-white/90 shadow-sm backdrop-blur">
      <div className="section-shell flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-emerald-800">
          <span className="flex h-10 w-10 items-center justify-center rounded-[0_1rem_0_1rem] bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
            <img src='/HimalayanPharma.jpeg' className="overflow-hidden h-8 w-8 rounded-[0_1rem_0_1rem]" />
          </span>
          <div className="leading-tight lg:hidden xl:block">
            <div className='text-emerald-700'>Himalayan</div>
            <div className="text-xs font-medium text-yellow-500">Pharma Works</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClasses} onClick={() => setOpen(false)}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/cart" className="relative">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-100 text-emerald-800 hover:border-emerald-400">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-xs text-white">
                  {itemCount}
                </span>
              )}
            </button>
          </Link>

          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2 rounded-full border border-emerald-100 px-3 py-2">
                <User className="h-4 w-4 text-emerald-700" />
                <span className="text-sm font-medium text-emerald-900">{user?.name}</span>
              </div>
              <button onClick={logout} className="btn-secondary flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary">
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                <Leaf className="mr-2 h-4 w-4" />
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          aria-label="Toggle menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-100 text-emerald-800 shadow-sm lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden">
          <nav className="section-shell grid gap-3 pb-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-base font-semibold ${
                    isActive ? 'bg-emerald-50 text-emerald-800' : 'text-slate-900 hover:bg-emerald-50'
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-2 grid gap-2">
              <Link to="/cart" className="btn-secondary w-full flex items-center justify-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Cart {itemCount > 0 && `(${itemCount})`}
              </Link>
              {isAuthenticated ? (
                <>
                  <div className="rounded-lg border border-emerald-100 px-4 py-2 text-center">
                    <span className="text-sm font-medium text-emerald-900">{user?.name}</span>
                  </div>
                  <button onClick={logout} className="btn-secondary w-full flex items-center justify-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-secondary w-full">
                    Login
                  </Link>
                  <Link to="/register" className="btn-primary w-full">
                    <Leaf className="mr-2 h-4 w-4" />
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
