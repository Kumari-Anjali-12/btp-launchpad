import {
  Blueprint,
  MtaDescriptor,
  MtaModule,
  MtaRequires,
  MtaResource,
  MtaValidationResult,
} from '../../types/designLab';
import { stringifyYaml, validateMtaSemantic } from './yamlParser';
import { getDeploymentProfile } from '../../data/designLab/defaultBlueprints';

export interface GeneratedMtaOutput {
  yaml: string;
  descriptor: MtaDescriptor;
  validation: MtaValidationResult;
  isBlocked: boolean;
  blockingReason?: string;
}

/**
 * Deterministic SAP MTA Generator.
 * Compiles a visual architecture graph into a standard, production-ready `mta.yaml` deployment descriptor.
 */
export function generateMtaDescriptor(blueprint: Blueprint): GeneratedMtaOutput {
  const profile = getDeploymentProfile(blueprint.deploymentProfile);

  // Check if profile supports MTA generation
  if (profile.targetRuntime === 'Local Development') {
    return {
      yaml: '# MTA Generation Disabled for Local Development Profile.\n# SQLite is an embedded file database and cannot be deployed in Cloud Foundry containers.\n',
      descriptor: {
        schemaVersion: '3.1.0',
        id: 'standalone-dev',
        version: '1.0.0',
        description: 'Local development profile',
        modules: [],
        resources: [],
      },
      validation: {
        isStructurallyValid: false,
        isSemanticallyValid: false,
        errors: ['Local standalone profile uses SQLite which is not deployable via Cloud Foundry MTA.'],
        warnings: [],
        badges: ['Local Development Only'],
      },
      isBlocked: true,
      blockingReason: 'MTA generation is disabled for the Local Development profile (SQLite is not deployable to Cloud Foundry).',
    };
  }

  const nodes = blueprint.nodes || [];
  const edges = blueprint.edges || [];

  const appRouterNode = nodes.find((n) => n.componentType === 'app-router');
  const capNode = nodes.find((n) => n.componentType === 'cap-service');
  const fioriNode = nodes.find((n) => n.componentType === 'fiori-app');
  const xsuaaNode = nodes.find((n) => n.componentType === 'xsuaa');
  const hanaNode = nodes.find((n) => n.componentType === 'hana-cloud');
  const destNode = nodes.find((n) => n.componentType === 'destination-service');
  const connNode = nodes.find((n) => n.componentType === 'connectivity-service');

  // Resource Names
  const xsuaaResourceName = (xsuaaNode?.customName || 'xsuaa-service').toLowerCase();
  const hanaResourceName = (
    (hanaNode?.configuration?.hdiContainerName as string) ||
    hanaNode?.customName ||
    'orders-db-hdi'
  ).toLowerCase();
  const destResourceName = (destNode?.customName || 'destination-service').toLowerCase();
  const connResourceName = (connNode?.customName || 'connectivity-service').toLowerCase();

  const mtaId = (blueprint.name || 'btp-launchpad-app')
    .toLowerCase()
    .replace(/[^a-z0-9_.-]/g, '-');

  const modules: MtaModule[] = [];
  const resources: MtaResource[] = [];

  // ==========================================
  // 1. CAP SERVICE MODULE
  // ==========================================
  if (capNode) {
    const srvName = (capNode.customName || (capNode.configuration?.serviceName as string) || 'srv').toLowerCase();
    const memory = (capNode.configuration?.memoryLimit as string) || '512M';

    const srvRequires: MtaRequires[] = [];

    // Check connections from CAP
    const capEdges = edges.filter((e) => e.sourceNodeId === capNode.id);
    for (const edge of capEdges) {
      const target = nodes.find((n) => n.id === edge.targetNodeId);
      if (target?.componentType === 'hana-cloud') {
        srvRequires.push({ name: hanaResourceName });
      } else if (target?.componentType === 'xsuaa') {
        srvRequires.push({ name: xsuaaResourceName });
      } else if (target?.componentType === 'destination-service') {
        srvRequires.push({ name: destResourceName });
      }
    }

    modules.push({
      name: srvName,
      type: 'nodejs',
      path: 'gen/srv',
      parameters: {
        buildpack: 'nodejs_buildpack',
        memory: memory,
      },
      buildParameters: {
        builder: 'npm',
        'build-result': 'gen/srv',
      },
      provides: [
        {
          name: 'srv-api',
          properties: {
            'srv-url': '${default-url}',
          },
        },
      ],
      requires: srvRequires,
    });
  }

  // ==========================================
  // 2. APP ROUTER MODULE
  // ==========================================
  if (appRouterNode) {
    const routerName = (
      appRouterNode.customName ||
      (appRouterNode.configuration?.routerName as string) ||
      'approuter'
    ).toLowerCase();

    const routerRequires: MtaRequires[] = [];

    // Requires XSUAA if bound
    if (xsuaaNode) {
      routerRequires.push({ name: xsuaaResourceName });
    }

    // Requires srv-api if CAP service exists
    if (capNode) {
      routerRequires.push({
        name: 'srv-api',
        group: 'destinations',
        properties: {
          name: 'srv-api',
          url: '~{srv-url}',
          forwardAuthToken: true,
        },
      });
    }

    // If Fiori app is in profile, require html5-repo-runtime
    if (profile.id === 'cf-fiori-cap-hana' || fioriNode) {
      routerRequires.push({
        name: 'html5-repo-runtime',
      });
    }

    modules.push({
      name: routerName,
      type: 'approuter.nodejs',
      path: 'app/',
      parameters: {
        'disk-quota': '256M',
        memory: '128M',
      },
      requires: routerRequires,
    });
  }

  // ==========================================
  // 3. FIORI APP DEPLOYER MODULE
  // ==========================================
  if (profile.id === 'cf-fiori-cap-hana' || fioriNode) {
    const fioriAppName = (fioriNode?.customName || (fioriNode?.configuration?.appName as string) || 'fiori-app').toLowerCase();

    modules.push({
      name: `${fioriAppName}-deployer`,
      type: 'com.sap.application.content',
      path: 'gen',
      requires: [
        {
          name: 'html5-repo-host',
          parameters: {
            'content-target': true,
          },
        },
      ],
      buildParameters: {
        'build-result': 'resources',
        requires: [
          {
            name: fioriAppName,
            artifacts: ['dist.zip'],
            'target-path': 'resources/',
          },
        ],
      },
    });
  }

  // ==========================================
  // 4. RESOURCES (XSUAA, HANA, DESTINATION, ETC.)
  // ==========================================

  // XSUAA Resource
  if (xsuaaNode) {
    const plan = (xsuaaNode.configuration?.servicePlan as string) || 'application';
    resources.push({
      name: xsuaaResourceName,
      type: 'org.cloudfoundry.managed-service',
      parameters: {
        service: 'xsuaa',
        'service-plan': plan,
        path: './xs-security.json',
        config: {
          xsappname: mtaId,
          'tenant-mode': 'dedicated',
        },
      },
    });
  }

  // HANA Cloud HDI Container Resource
  if (hanaNode) {
    const plan = (hanaNode.configuration?.servicePlan as string) || 'hdi-shared';
    resources.push({
      name: hanaResourceName,
      type: 'com.sap.xs.hana',
      parameters: {
        service: 'hana',
        'service-plan': plan,
      },
    });
  }

  // Destination Service Resource
  if (destNode) {
    resources.push({
      name: destResourceName,
      type: 'org.cloudfoundry.managed-service',
      parameters: {
        service: 'destination',
        'service-plan': 'lite',
      },
    });
  }

  // Connectivity Service Resource
  if (connNode) {
    resources.push({
      name: connResourceName,
      type: 'org.cloudfoundry.managed-service',
      parameters: {
        service: 'connectivity',
        'service-plan': 'lite',
      },
    });
  }

  // HTML5 Application Repository Resources (for Fiori profile)
  if (profile.id === 'cf-fiori-cap-hana' || fioriNode) {
    resources.push({
      name: 'html5-repo-host',
      type: 'org.cloudfoundry.managed-service',
      parameters: {
        service: 'html5-apps-repo',
        'service-plan': 'app-host',
      },
    });

    resources.push({
      name: 'html5-repo-runtime',
      type: 'org.cloudfoundry.managed-service',
      parameters: {
        service: 'html5-apps-repo',
        'service-plan': 'app-runtime',
      },
    });
  }

  const descriptor: MtaDescriptor = {
    schemaVersion: profile.mtaSchemaVersion || '3.1.0',
    id: mtaId,
    version: '1.0.0',
    description: blueprint.description || 'Generated SAP BTP Multi-Target Application descriptor',
    parameters: {
      'enable-parallel-deployments': true,
    },
    modules,
    resources,
  };

  const validation = validateMtaSemantic(descriptor);

  // Build formatted YAML text with metadata header
  const header = [
    '## -----------------------------------------------------------------------------',
    '## SAP BTP MULTI-TARGET APPLICATION DEPLOYMENT DESCRIPTOR (mta.yaml)',
    `## Generated by BTP Launchpad Visual Architecture Designer`,
    `## Architecture: ${blueprint.name}`,
    `## Deployment Profile: ${profile.title}`,
    `## Schema Version: ${descriptor.schemaVersion} | Timestamp: ${new Date().toISOString()}`,
    '## Standard: SAP BTP Cloud Foundry Deployment Conventions',
    '## -----------------------------------------------------------------------------',
    '',
  ].join('\n');

  // Convert descriptor to YAML string with exact SAP MTA format
  const rawDescriptorForYaml = {
    '_schema-version': descriptor.schemaVersion,
    ID: descriptor.id,
    version: descriptor.version,
    description: descriptor.description,
    parameters: descriptor.parameters,
    modules: descriptor.modules,
    resources: descriptor.resources,
  };

  const yamlContent = header + stringifyYaml(rawDescriptorForYaml);

  return {
    yaml: yamlContent,
    descriptor,
    validation,
    isBlocked: !validation.isStructurallyValid,
  };
}

/**
 * Browser file download utility for mta.yaml.
 */
export function downloadMtaYaml(yamlContent: string, filename = 'mta.yaml'): void {
  if (typeof window === 'undefined' || !window.Blob) return;

  const blob = new Blob([yamlContent], { type: 'text/yaml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
