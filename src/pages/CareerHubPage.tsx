import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const CareerHubPage: React.FC = () => {
  const roles = [
    {
      title: 'SAP BTP Developer',
      level: 'Junior to Mid',
      salaryRange: '$85k – $130k (US) / ₹8L – ₹18L (India)',
      description: 'Builds extensions, microservices, and integrations using Cloud Foundry, Kyma, and CAP.',
      topSkills: ['Core Data Services (CDS)', 'Node.js or Java', 'OData v4', 'MTA Deployment', 'XSUAA Security'],
      portfolioProject: 'Incident Management SaaS App with Multi-Tenancy & Email Notifications',
    },
    {
      title: 'CAP Full-Stack Cloud Engineer',
      level: 'Mid to Senior',
      salaryRange: '$100k – $155k (US) / ₹12L – ₹26L (India)',
      description: 'Specializes in full-stack SAP applications connecting Fiori Element frontends to CAP backends and HANA Cloud.',
      topSkills: ['CAP Framework', 'SAP Fiori Elements', 'SAPUI5', 'HANA Cloud Modeling', 'Cloud Foundry CLI'],
      portfolioProject: 'Real-Time Warehouse Inventory Tracker with Fiori List Report & Object Page',
    },
    {
      title: 'SAP Integration Consultant',
      level: 'Junior to Mid',
      salaryRange: '$90k – $140k (US) / ₹9L – ₹20L (India)',
      description: 'Connects cloud solutions with on-premise S/4HANA systems, manages APIs, and coordinates asynchronous events.',
      topSkills: ['SAP Cloud Connector', 'Destination Service', 'SAP Event Mesh', 'API Management', 'OAuth 2.0'],
      portfolioProject: 'Hybrid Cloud-to-On-Premise Purchase Order Sync using Cloud Connector and Event Mesh',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <Badge variant="success" className="mb-1">
          Career Pathways
        </Badge>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          BTP Career Hub & Interview Prep
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
          Discover high-demand enterprise cloud careers. Explore role blueprints, required skills, resume-worthy portfolio projects, and interview preparation guides.
        </p>
      </div>

      {/* Role Blueprints Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role) => (
          <Card key={role.title} className="flex flex-col justify-between">
            <div>
              <CardHeader>
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="info" size="sm">
                    {role.level}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{role.title}</CardTitle>
                <CardDescription className="text-xs">{role.salaryRange}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {role.description}
                </p>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
                    Essential Skills:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {role.topSkills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded bg-slate-100 px-2 py-0.5 text-[11px] text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg bg-emerald-50/60 p-3 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block mb-1">
                    Recommended Portfolio Project:
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300">
                    {role.portfolioProject}
                  </p>
                </div>
              </CardContent>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
              <Link to="/roadmap" className="block w-full">
                <Button variant="outline" size="sm" fullWidth rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                  View Role Roadmap
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
