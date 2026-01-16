import { Outlet, Link, useLocation, useSearchParams } from 'react-router-dom';
import { LogOut, ShieldCheck, Package, FileText, Tags, LayoutDashboard, PencilRuler } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const adminTabs = [
    { tab: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    { tab: 'products', label: 'Products', icon: <Package className="h-4 w-4" /> },
    { tab: 'categories', label: 'Categories', icon: <Tags className="h-4 w-4" /> },
    { tab: 'news', label: 'News', icon: <FileText className="h-4 w-4" /> },
    { tab: 'blog', label: 'Blog', icon: <FileText className="h-4 w-4" /> },
    { tab: 'content', label: 'Site Content', icon: <PencilRuler className="h-4 w-4" /> },
  ];

  const contentSections = [
    { hash: '#home', label: 'Homepage' },
    { hash: '#stats', label: 'Stats' },
    { hash: '#testimonials', label: 'Testimonials' },
    { hash: '#science-highlights', label: 'Science highlights' },
    { hash: '#commitments', label: 'Commitments' },
    { hash: '#media-gallery', label: 'Media gallery' },
    { hash: '#jobs', label: 'Jobs' },
    { hash: '#locations', label: 'Locations' },
  ];

  const navItems = [
    { to: '/admin', label: 'Dashboard' },
    { to: '/admin/content', label: 'Content' },
  ];

  const isContentPage = location.pathname === '/admin/content';
  const activeTab = searchParams.get('tab') || 'dashboard';
  const activeHash = location.hash || '';

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
          <div className="flex items-center gap-2 text-blue-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-[0_1rem_0_1rem] bg-blue-600 text-white shadow-lg shadow-blue-600/30">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide">Admin</p>
              <p className="text-xs text-blue-700">Himalayan Pharma Works</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-blue-900">{user?.name}</p>
              <p className="text-xs text-slate-600">{user?.email}</p>
            </div>
            <button onClick={logout} className="btn-secondary flex items-center gap-2 px-4 py-2">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
            <Link to="/" className="rounded-full border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-800 transition hover:bg-blue-50">
              Back to site
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[220px_1fr]">
        <aside className="sticky top-0 h-screen rounded-2xl border border-blue-100 bg-white/80 p-4 shadow-sm backdrop-blur">
          <div className="mb-4 text-xs font-semibold uppercase text-slate-500">Navigation</div>
          <nav className="mb-6 grid gap-2 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-lg px-3 py-2 font-semibold transition ${
                  location.pathname === item.to
                    ? 'bg-blue-100 text-blue-800'
                    : 'text-slate-800 hover:bg-blue-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {!isContentPage && (
            <>
              <div className="mb-3 text-xs font-semibold uppercase text-slate-500">Sections</div>
              <nav className="grid gap-2 text-sm">
                {adminTabs.map((item) => (
                  <button
                    key={item.tab}
                    type="button"
                    onClick={() => handleQuickJump(item.tab)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 font-semibold transition text-left ${
                      activeTab === item.tab
                        ? 'bg-blue-100 text-blue-800'
                        : 'text-slate-800 hover:bg-blue-50 hover:text-blue-800'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
            </>
          )}

          {isContentPage && (
            <>
              <div className="mb-3 text-xs font-semibold uppercase text-slate-500">Jump to section</div>
              <nav className="grid gap-2 text-sm">
                {contentSections.map((section) => (
                  <a
                    key={section.hash}
                    href={section.hash}
                    className={`rounded-lg px-3 py-2 font-semibold transition ${
                      activeHash === section.hash
                        ? 'bg-blue-100 text-blue-800'
                        : 'text-slate-800 hover:bg-blue-50 hover:text-blue-800'
                    }`}
                  >
                    {section.label}
                  </a>
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
