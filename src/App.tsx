import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ShellLayout } from './components/layout/ShellLayout';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { ChaptersPage } from './pages/ChaptersPage';
import { ModuleDetailPage } from './pages/ModuleDetailPage';
import { LearnChapterPage } from './pages/LearnChapterPage';
import { PracticePage } from './pages/PracticePage';
import { CheatsheetPage } from './pages/CheatsheetPage';
import { DesignLabPage } from './pages/DesignLabPage';
import { CareerHubPage } from './pages/CareerHubPage';
import { CapstoneOverviewPage } from './pages/capstone/CapstoneOverviewPage';
import { CapstoneLevel1Page } from './pages/capstone/CapstoneLevel1Page';
import { CapstoneLevel2Page } from './pages/capstone/CapstoneLevel2Page';
import { CapstoneLevel3Page } from './pages/capstone/CapstoneLevel3Page';
import { CapstoneFinalAssessmentPage } from './pages/capstone/CapstoneFinalAssessmentPage';
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
        <Route path="/learn" element={<Navigate to="/learn/mod-0-1" replace />} />
        <Route path="/learn/:chapterId" element={<LearnChapterPage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/cheatsheet" element={<CheatsheetPage />} />
        <Route path="/design-lab" element={<DesignLabPage />} />
        <Route path="/career-hub" element={<CareerHubPage />} />
        <Route path="/capstone" element={<CapstoneOverviewPage />} />
        <Route path="/capstone/level-1" element={<CapstoneLevel1Page />} />
        <Route path="/capstone/level-2" element={<CapstoneLevel2Page />} />
        <Route path="/capstone/level-3" element={<CapstoneLevel3Page />} />
        <Route path="/capstone/final-assessment" element={<CapstoneFinalAssessmentPage />} />
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
