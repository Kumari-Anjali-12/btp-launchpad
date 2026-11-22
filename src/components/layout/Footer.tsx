import React from 'react';
import { Rocket, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-sap-slate-900 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-sap-blue-500 text-white">
              <Rocket className="h-3.5 w-3.5" />
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              BTP Launchpad
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              — Student-Facing SAP BTP Educational Platform
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <Link to="/roadmap" className="hover:text-sap-blue-500 transition-colors">
              Roadmap
            </Link>
            <Link to="/chapters" className="hover:text-sap-blue-500 transition-colors">
              Curriculum
            </Link>
            <Link to="/cheatsheet" className="hover:text-sap-blue-500 transition-colors">
              Acronym Cheatsheet
            </Link>
            <a
              href="https://github.com/Kumari-Anjali-12/btp-launchpad"
              target="_blank"
              rel="noreferrer"
              className="hover:text-sap-blue-500 transition-colors"
            >
              GitHub Repository
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 pt-6 dark:border-slate-800/80 gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5 text-center sm:text-left">
            <ShieldAlert className="h-3.5 w-3.5 text-sky-500 shrink-0" />
            <span>
              <strong>Educational Simulation Disclaimer:</strong> BTP Launchpad is an independent educational tool.
              All interactive sandboxes run in simulated client environments.
            </span>
          </div>
          <div>WCAG 2.2 AA Compliant &bull; MIT License</div>
        </div>
      </div>
    </footer>
  );
};
