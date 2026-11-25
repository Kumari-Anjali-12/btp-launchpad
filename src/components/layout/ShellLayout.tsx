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
        { label: 'Curriculum', href: '/chapters' },
        { label: `Module ${chapterId.replace('mod-', '').replace('ch-', '').replace('-', '.')}` },
      ];
    }

    const segments = path.split('/').filter(Boolean);
    return segments.map((seg, idx) => {
      const href = '/' + segments.slice(0, idx + 1).join('/');
      let label = seg.charAt(0).toUpperCase() + seg.slice(1);
      if (seg === 'career-hub') label = 'Career Hub';
      if (seg === 'design-lab') label = 'Design Lab';
      if (seg === 'cheatsheet') label = 'Cheatsheets';
      if (seg === 'capstone') label = 'Capstones';
      if (seg === 'level-1') label = 'Level 1: Data Modeling';
      if (seg === 'level-2') label = 'Level 2: Business Logic';
      if (seg === 'level-3') label = 'Level 3: Fiori & Deployment';
      if (seg.startsWith('module-')) label = `Module ${seg.replace('module-', '')}`;

      return { label, href };
    });
  };

  const breadcrumbs = generateBreadcrumbs();
  const isLandingPage = location.pathname === '/';
  const isLearnPage = location.pathname.startsWith('/learn/');

  // Landing page: full width, no sidebar
  if (isLandingPage) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fbf9f4] text-stone-900 dark:bg-[#141517] dark:text-stone-100">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white text-xs font-bold"
        >
          Skip to main content
        </a>
        <Header
          onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
          isMobileNavOpen={isMobileNavOpen}
        />
        <MobileNav
          isOpen={isMobileNavOpen}
          onClose={() => setIsMobileNavOpen(false)}
        />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }

  // Learn page: full-width 3-column specialized learning workspace
  if (isLearnPage) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fbf9f4] text-stone-900 dark:bg-[#141517] dark:text-stone-100">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white text-xs font-bold"
        >
          Skip to main content
        </a>
        <Header
          onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
          isMobileNavOpen={isMobileNavOpen}
        />
        <MobileNav
          isOpen={isMobileNavOpen}
          onClose={() => setIsMobileNavOpen(false)}
        />
        <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col w-full overflow-hidden outline-none">
          <Outlet />
        </main>
      </div>
    );
  }

  // Standard shell layout for Dashboard, Roadmap, Practice, Design Lab, Cheatsheet, Career Hub
  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f4] text-stone-900 dark:bg-[#141517] dark:text-stone-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white text-xs font-bold"
      >
        Skip to main content
      </a>
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
        <main id="main-content" tabIndex={-1} className="flex-1 min-w-0 flex flex-col overflow-y-auto px-4 py-6 sm:px-8 max-w-7xl mx-auto w-full outline-none">
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
