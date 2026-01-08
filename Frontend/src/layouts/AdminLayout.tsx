import { Outlet, Link, useLocation, useSearchParams } from 'react-router-dom';
import { LogOut, ShieldCheck, Package, FileText, Tags, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [, setSearchParams] = useSearchParams();

  const quickLinks = [
    { tab: 'dashboard', label: 'Overview', icon: <LayoutDashboard className="h-4 w-4" /> },
    { tab: 'products', label: 'Products', icon: <Package className="h-4 w-4" /> },
    { tab: 'news', label: 'News', icon: <FileText className="h-4 w-4" /> },
    { tab: 'blog', label: 'Blog', icon: <FileText className="h-4 w-4" /> },
    { tab: 'categories', label: 'Categories', icon: <Tags className="h-4 w-4" /> },
  ];

  const navItems = [
    { to: '/admin', label: 'Dashboard' },
    { to: '/admin/content', label: 'Content' },
  ];

  const isContentPage = location.pathname === '/admin/content';

  const handleQuickJump = (tab: string) => {
    // Dispatch custom event that AdminPanel listens for
    window.dispatchEvent(new CustomEvent('admin:navigate', { detail: { tab } }));
    // Also update URL params for bookmarkability
    setSearchParams({ tab });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2 text-emerald-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-[0_1rem_0_1rem] bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide">Admin</p>
              <p className="text-xs text-emerald-700">Himalayan Pharma Works</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-emerald-900">{user?.name}</p>
              <p className="text-xs text-slate-600">{user?.email}</p>
            </div>
            <button onClick={logout} className="btn-secondary flex items-center gap-2 px-4 py-2">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
            <Link to="/" className="rounded-full border border-emerald-200 px-3 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50">
              Back to site
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[220px_1fr]">
        <aside className="rounded-2xl border border-emerald-100 bg-white/80 p-4 shadow-sm h-fit">
          <div className="mb-4 text-xs font-semibold uppercase text-slate-500">Navigation</div>
          <nav className="mb-6 grid gap-2 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-lg px-3 py-2 font-semibold transition ${
                  location.pathname === item.to
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'text-slate-800 hover:bg-emerald-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {!isContentPage && (
            <>
              <div className="mb-3 text-xs font-semibold uppercase text-slate-500">Quick jump</div>
              <nav className="grid gap-2 text-sm">
                {quickLinks.map((item) => (
                  <button
                    key={item.tab}
                    type="button"
                    onClick={() => handleQuickJump(item.tab)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 font-semibold text-slate-800 transition hover:bg-emerald-50 hover:text-emerald-800 text-left"
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
            </>
          )}
        </aside>

        <main className="space-y-8 pb-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
