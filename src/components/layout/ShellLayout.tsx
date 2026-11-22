import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { Footer } from './Footer';
import { Breadcrumbs, BreadcrumbItem } from '../common/Breadcrumbs';

export const ShellLayout: React.FC = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const location = useLocation();

  // Generate dynamic breadcrumbs based on pathname
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') {
      return [{ label: 'Dashboard' }];
    }

    if (path.startsWith('/learn/')) {
      const chapterId = path.replace('/learn/', '');
      return [
        { label: 'Chapters', href: '/chapters' },
        { label: `Lesson ${chapterId.replace('ch-', '').replace('-', '.')}` },
      ];
    }

    const segments = path.split('/').filter(Boolean);
    return segments.map((seg, idx) => {
      const href = '/' + segments.slice(0, idx + 1).join('/');
      let label = seg.charAt(0).toUpperCase() + seg.slice(1);
      if (seg === 'career-hub') label = 'Career Hub';
      if (seg === 'design-lab') label = 'Design Lab';
      if (seg.startsWith('module-')) label = `Module ${seg.replace('module-', '')}`;

      return { label, href };
    });
  };

  const breadcrumbs = generateBreadcrumbs();
  const isLandingPage = location.pathname === '/';

  if (isLandingPage) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-sap-slate-950 dark:text-slate-100">
        <Header
          onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
          isMobileNavOpen={isMobileNavOpen}
        />
        <MobileNav
          isOpen={isMobileNavOpen}
          onClose={() => setIsMobileNavOpen(false)}
        />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-sap-slate-950 dark:text-slate-100">
      <Header
        onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
        isMobileNavOpen={isMobileNavOpen}
      />
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      <div className="flex flex-1">
        <Sidebar className="hidden md:flex" />
        <main className="flex-1 flex flex-col overflow-y-auto px-4 py-6 sm:px-8 max-w-7xl mx-auto w-full">
          <div className="mb-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
          <div className="flex-1">
            <Outlet />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};
