import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ShellLayout } from './components/layout/ShellLayout';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { ChaptersPage } from './pages/ChaptersPage';
import { ModuleDetailPage } from './pages/ModuleDetailPage';
import { PracticePage } from './pages/PracticePage';
import { CheatsheetPage } from './pages/CheatsheetPage';
import { DesignLabPage } from './pages/DesignLabPage';
import { CareerHubPage } from './pages/CareerHubPage';
import { loadUserProgress, applyTheme } from './lib/storage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<ShellLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/chapters" element={<ChaptersPage />} />
        <Route path="/chapters/:moduleId" element={<ModuleDetailPage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/cheatsheet" element={<CheatsheetPage />} />
        <Route path="/design-lab" element={<DesignLabPage />} />
        <Route path="/career-hub" element={<CareerHubPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export const App: React.FC = () => {
  useEffect(() => {
    const progress = loadUserProgress();
    applyTheme(progress.theme);
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};
