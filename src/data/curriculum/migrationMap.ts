/**
 * Traceable mapping between legacy 15 chapters and the new 36-module 9-phase syllabus.
 */
export const LEGACY_CHAPTER_TO_MODULE_MAP: Record<string, string> = {
  'ch-0-1': 'mod-0-1', // Enterprise ERP Architecture -> SAP World Basics
  'ch-0-2': 'mod-1-2', // BTP Core Pillars -> SAP BTP Overview
  'ch-0-3': 'mod-1-3', // Trial Setup & Hierarchy -> Account Navigation
  'ch-1-1': 'mod-3-1', // CDS Entity Modeling -> CAP Fundamentals
  'ch-1-2': 'mod-3-3', // CDS Relationships & Projections -> Data and Persistence
  'ch-1-3': 'mod-3-2', // CAP Event Handlers -> Service Implementation
  'ch-2-1': 'mod-4-1', // Fiori Fundamentals -> Fiori Elements (first)
  'ch-2-2': 'mod-4-1', // Fiori Elements Annotations -> Fiori Elements (first)
  'ch-2-3': 'mod-4-2', // UI5 MVC & XML Views -> SAPUI5 Basics
  'ch-3-1': 'mod-5-1', // XSUAA & OAuth Security -> Authentication
  'ch-3-2': 'mod-5-3', // Destinations & Cloud Connector -> Destinations
  'ch-3-3': 'mod-5-3', // Integration Suite & Events -> Destinations (integration)
  'ch-4-1': 'mod-6-1', // MTA Packaging -> MTA Deployment
  'ch-4-2': 'mod-1-5', // Cloud Foundry Deployment -> Cloud Foundry (only)
  'ch-4-3': 'mod-7-6', // Clean Core & Extensibility -> Extensibility and Clean Core
};

export const MODULE_TO_LEGACY_CHAPTER_MAP: Record<string, string> = Object.entries(
  LEGACY_CHAPTER_TO_MODULE_MAP
).reduce((acc, [chapId, modId]) => {
  acc[modId] = chapId;
  return acc;
}, {} as Record<string, string>);
