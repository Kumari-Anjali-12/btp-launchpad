import React from 'react';
import { Link } from 'react-router-dom';
import {
  Map,
  CheckCircle2,
  ArrowRight,
  Zap,
  Award,
  Clock,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { getAllPhases } from '../data/curriculum';

export const LandingPage: React.FC = () => {
  const phases = getAllPhases();

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sap-blue-200 bg-sap-blue-50/80 px-3 py-1 text-xs font-semibold text-sap-blue-700 dark:border-sap-blue-800/60 dark:bg-sap-blue-950/40 dark:text-sap-blue-300 mb-6">
            <Zap className="h-3.5 w-3.5" />
            <span>Zero-to-Cloud SAP BTP Curriculum for Students &amp; Beginners</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl max-w-4xl mx-auto leading-tight">
            Master <span className="text-sap-blue-500">SAP BTP Development</span> Without Enterprise Gatekeeping.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Demystify enterprise cloud architecture. Progress from zero SAP knowledge to building full-stack Cloud Application Programming (CAP) models, Fiori apps, enterprise security, and Generative AI Hub extensions across 9 structured phases.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Start Learning Free
              </Button>
            </Link>
            <Link to="/roadmap">
              <Button variant="outline" size="lg" leftIcon={<Map className="h-4 w-4" />}>
                Explore 9-Phase Roadmap
              </Button>
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> No SAP Account Required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> 100% Free &amp; Open-Source
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> In-Browser Simulated Labs
            </span>
          </div>
        </div>
      </section>

      {/* Curriculum Preview Section (Authoritative 9 Phases) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="info" className="mb-2">
            Structured Path
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            From Zero to BTP Cloud Engineer in 9 Phases
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Exactly 36 deep-dive modules and 9 production-grade capstone deliverables. Every phase breaks abstract enterprise jargon down into real-world analogies, actionable code, and interactive checkpoints.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {phases.map((phase) => {
            const categoryBadgeVariant =
              phase.badgeCategory === 'pre-learning'
                ? 'default'
                : phase.badgeCategory === 'ai-layer'
                ? 'purple'
                : phase.badgeCategory === 'capstone'
                ? 'warning'
                : 'success';

            return (
              <Card
                key={phase.id}
                className="flex flex-col justify-between hover:border-sap-blue-300 dark:hover:border-sap-blue-700 transition-colors"
              >
                <div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-mono uppercase tracking-wider text-sap-blue-600 dark:text-sap-blue-400">
                        Phase {phase.number} &bull; {phase.suggestedWeeks}
                      </span>
                      <Badge variant={categoryBadgeVariant}>
                        {phase.badgeCategory.replace('-', ' ')}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-2">{phase.title}</CardTitle>
                    <CardDescription className="text-xs">{phase.tagline}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {phase.description}
                    </p>

                    <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                      <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
                        <Award className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">Capstone: {phase.capstone.title}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        <strong>Goal:</strong> {phase.coreObjective}
                      </div>
                    </div>
                  </CardContent>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {phase.modules.length} modules &bull; ~{phase.estimatedHours} hrs
                  </span>
                  <Link to={`/learn/${phase.modules[0]?.id || 'mod-0-1'}`}>
                    <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                      Explore Phase
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Feature Pillars Preview */}
      <section className="bg-slate-100/70 dark:bg-sap-slate-900/50 py-16 border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Engineered for Hands-On Retention
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Stop passively reading 400-page enterprise PDFs. Learn through interactive sandboxes, visual architecture builders, and practical translation cheatsheets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardTitle>In-Browser CDS &amp; CAP Sandbox</CardTitle>
              <CardDescription className="mt-2">
                Write Core Data Services (CDS) models and test simulated OData v4 queries in-browser without needing a paid SAP cloud tenant.
              </CardDescription>
              <div className="mt-4">
                <Link to="/practice">
                  <Button variant="outline" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                    Preview Sandbox
                  </Button>
                </Link>
              </div>
            </Card>

            <Card>
              <CardTitle>Visual Architecture Design Lab</CardTitle>
              <CardDescription className="mt-2">
                Drag-and-drop BTP components (Approuter, CAP backend, HANA DB, Destinations) and validate enterprise connection rules.
              </CardDescription>
              <div className="mt-4">
                <Link to="/design-lab">
                  <Button variant="outline" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                    Preview Design Lab
                  </Button>
                </Link>
              </div>
            </Card>

            <Card>
              <CardTitle>Career Hub &amp; Interview Prep</CardTitle>
              <CardDescription className="mt-2">
                Curated role blueprints (BTP Developer, CAP Engineer, Integration Consultant) with 50+ interview questions and beginner-vs-senior answers.
              </CardDescription>
              <div className="mt-4">
                <Link to="/career-hub">
                  <Button variant="outline" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                    Preview Career Hub
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-sap-blue-200 bg-gradient-to-br from-sap-blue-500 to-sap-blue-700 p-8 sm:p-12 text-white shadow-xl dark:border-sap-blue-700/60">
          <div className="max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to break into enterprise cloud engineering?
            </h3>
            <p className="mt-3 text-sap-blue-100 text-sm sm:text-base">
              No login required. Your learning progress is safely remembered in your browser. Begin with Phase 0 and build your first CAP app today.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="bg-white text-sap-blue-700 hover:bg-slate-100 focus-visible:outline-white">
                  Enter Dashboard
                </Button>
              </Link>
              <Link to="/learn/mod-0-1">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Start Phase 0
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
