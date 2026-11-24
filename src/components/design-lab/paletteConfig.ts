import React from 'react';
import {
  Globe,
  Smartphone,
  Layout,
  ShieldAlert,
  Server,
  Cpu,
  Network,
  ShieldCheck,
  Lock,
  Key,
  Database,
  HardDrive,
  Share2,
  Radio,
  Building2,
  Layers,
  PackageCheck,
  Boxes,
} from 'lucide-react';
import { ComponentCategory } from '../../types/designLab';

export const CATEGORY_LABELS: Record<ComponentCategory | 'all', string> = {
  all: 'All Components',
  ui: 'App & UI',
  service: 'Services',
  security: 'Security',
  data: 'Data & DB',
  connectivity: 'Connectivity',
  deployment: 'Deployment',
};

// Lucide icon resolver map
export const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Globe,
  Smartphone,
  Layout,
  ShieldAlert,
  Server,
  Cpu,
  Network,
  ShieldCheck,
  Lock,
  Key,
  Database,
  HardDrive,
  Share2,
  Radio,
  Building2,
  Layers,
  PackageCheck,
  Boxes,
};

export const CATEGORY_COLORS: Record<ComponentCategory, { bg: string; text: string; border: string }> = {
  ui: {
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-800',
  },
  service: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800',
  },
  security: {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-800',
  },
  data: {
    bg: 'bg-purple-50 dark:bg-purple-950/40',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-800',
  },
  connectivity: {
    bg: 'bg-cyan-50 dark:bg-cyan-950/40',
    text: 'text-cyan-700 dark:text-cyan-300',
    border: 'border-cyan-200 dark:border-cyan-800',
  },
  deployment: {
    bg: 'bg-stone-100 dark:bg-stone-800',
    text: 'text-stone-700 dark:text-stone-300',
    border: 'border-stone-200 dark:border-stone-700',
  },
};
