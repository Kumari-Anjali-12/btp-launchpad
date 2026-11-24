import {
  Blueprint,
  ValidationIssue,
  ValidationResult,
} from '../../types/designLab';
import { COMPONENT_CATALOGUE } from '../../data/designLab/catalogue';
import { isValidConnection, isForbiddenConnection } from '../../data/designLab/connectionRules';
import { getDeploymentProfile } from '../../data/designLab/defaultBlueprints';

/**
 * Pure, deterministic architecture validator.
 * Evaluates the structural graph integrity, application architecture, security boundaries,
 * and deployment readiness of an SAP BTP architecture blueprint.
 */
export function validateArchitecture(blueprint: Blueprint): ValidationResult {
  const issues: ValidationIssue[] = [];

  try {
    const nodes = blueprint.nodes || [];
    const edges = blueprint.edges || [];
    const profile = getDeploymentProfile(blueprint.deploymentProfile);

    // Map for fast node lookups
    const nodeMap = new Map<string, (typeof nodes)[0]>();
    const seenNodeIds = new Set<string>();

    // ========================================================
    // 1. GRAPH INTEGRITY RULES
    // ========================================================

    // 1.1 Empty Canvas
    if (nodes.length === 0) {
      issues.push({
        id: 'issue-empty-canvas',
        ruleId: 'GRAPH_EMPTY_CANVAS',
        severity: 'info',
        category: 'graph',
        title: 'Empty Architecture Canvas',
        plainEnglishExplanation: 'Your architecture canvas is completely empty.',
        technicalExplanation: 'The blueprint contains zero topology nodes. Add components from the library to begin.',
        affectedNodeIds: [],
        affectedEdgeIds: [],
        suggestedCorrection: 'Select components from the left Component Library palette to build your architecture.',
        blocksMtaGeneration: true,
      });
      return formatResult(issues);
    }

    // 1.2 Duplicate Node IDs
    for (const node of nodes) {
      if (seenNodeIds.has(node.id)) {
        issues.push({
          id: `issue-duplicate-node-${node.id}`,
          ruleId: 'GRAPH_DUPLICATE_NODE_ID',
          severity: 'error',
          category: 'graph',
          title: `Duplicate Component ID: ${node.id}`,
          plainEnglishExplanation: `Two components share the exact same internal ID "${node.id}".`,
          technicalExplanation: 'Graph nodes must maintain globally unique identifiers to prevent state collision.',
          affectedNodeIds: [node.id],
          affectedEdgeIds: [],
          suggestedCorrection: 'Delete one of the duplicate components or recreate it.',
          blocksMtaGeneration: true,
        });
      } else {
        seenNodeIds.add(node.id);
        nodeMap.set(node.id, node);
      }
    }

    // Track connections per node
    const incomingEdges = new Map<string, string[]>();
    const outgoingEdges = new Map<string, string[]>();
    for (const node of nodes) {
      incomingEdges.set(node.id, []);
      outgoingEdges.set(node.id, []);
    }

    // 1.3 Dangling Edges & Self-referencing Edges
    const seenEdgePairs = new Set<string>();

    for (const edge of edges) {
      const sourceNode = nodeMap.get(edge.sourceNodeId);
      const targetNode = nodeMap.get(edge.targetNodeId);

      if (!sourceNode || !targetNode) {
        issues.push({
          id: `issue-dangling-edge-${edge.id}`,
          ruleId: 'GRAPH_DANGLING_EDGE',
          severity: 'error',
          category: 'graph',
          title: 'Dangling Connection',
          plainEnglishExplanation: 'A connection line points to a component that was deleted or does not exist.',
          technicalExplanation: `Edge "${edge.id}" references non-existent node "${!sourceNode ? edge.sourceNodeId : edge.targetNodeId}".`,
          affectedNodeIds: [],
          affectedEdgeIds: [edge.id],
          suggestedCorrection: 'Delete this orphaned connection line from the canvas.',
          blocksMtaGeneration: true,
        });
        continue;
      }

      if (edge.sourceNodeId === edge.targetNodeId) {
        issues.push({
          id: `issue-self-edge-${edge.id}`,
          ruleId: 'GRAPH_SELF_REFERENCE',
          severity: 'error',
          category: 'graph',
          title: 'Invalid Self-Connection',
          plainEnglishExplanation: `Component "${sourceNode.label}" is connected directly back to itself.`,
          technicalExplanation: 'Circular self-loops on a single component are invalid in SAP BTP architecture graphs.',
          affectedNodeIds: [sourceNode.id],
          affectedEdgeIds: [edge.id],
          suggestedCorrection: 'Remove the loop connection connecting the component to itself.',
          blocksMtaGeneration: true,
        });
      }

      const edgePairKey = `${edge.sourceNodeId}->${edge.targetNodeId}`;
      if (seenEdgePairs.has(edgePairKey)) {
        issues.push({
          id: `issue-duplicate-edge-${edge.id}`,
          ruleId: 'GRAPH_DUPLICATE_EDGE',
          severity: 'warning',
          category: 'graph',
          title: 'Redundant Duplicate Connection',
          plainEnglishExplanation: `There are multiple identical connections between "${sourceNode.label}" and "${targetNode.label}".`,
          technicalExplanation: 'Duplicate edges create redundant bindings in the generated deployment manifest.',
          affectedNodeIds: [sourceNode.id, targetNode.id],
          affectedEdgeIds: [edge.id],
          suggestedCorrection: 'Delete the duplicate connection line.',
          blocksMtaGeneration: false,
        });
      } else {
        seenEdgePairs.add(edgePairKey);
      }

      incomingEdges.get(edge.targetNodeId)?.push(edge.id);
      outgoingEdges.get(edge.sourceNodeId)?.push(edge.id);

      // 1.4 Security & Architecture Forbidden Relationships
      const forbiddenCheck = isForbiddenConnection(sourceNode.componentType, targetNode.componentType);
      if (forbiddenCheck.forbidden) {
        issues.push({
          id: `issue-forbidden-${edge.id}`,
          ruleId: 'ARCH_FORBIDDEN_CONNECTION',
          severity: 'error',
          category: 'security',
          title: 'Prohibited Architecture Connection',
          plainEnglishExplanation: forbiddenCheck.reason || 'This connection violates enterprise architectural standards.',
          technicalExplanation: `Direct communication between "${sourceNode.componentType}" and "${targetNode.componentType}" is forbidden.`,
          affectedNodeIds: [sourceNode.id, targetNode.id],
          affectedEdgeIds: [edge.id],
          suggestedCorrection: 'Remove this direct line and route communication through an approved intermediary backend service.',
          blocksMtaGeneration: true,
        });
      } else {
        // 1.5 Supported Connection Validation
        const validRule = isValidConnection(sourceNode.componentType, targetNode.componentType);
        if (!validRule) {
          issues.push({
            id: `issue-invalid-connection-${edge.id}`,
            ruleId: 'GRAPH_INVALID_CONNECTION_TYPE',
            severity: 'error',
            category: 'graph',
            title: 'Unsupported Connection Type',
            plainEnglishExplanation: `SAP BTP does not support connecting "${sourceNode.label}" directly to "${targetNode.label}".`,
            technicalExplanation: `No certified relationship exists from ${sourceNode.componentType} to ${targetNode.componentType}.`,
            affectedNodeIds: [sourceNode.id, targetNode.id],
            affectedEdgeIds: [edge.id],
            suggestedCorrection: 'Review the component catalogue guidance to see valid connection targets for this component.',
            blocksMtaGeneration: true,
          });
        }
      }
    }

    // 1.6 Isolated Components (Orphan Nodes)
    if (nodes.length > 1) {
      for (const node of nodes) {
        const inCount = incomingEdges.get(node.id)?.length || 0;
        const outCount = outgoingEdges.get(node.id)?.length || 0;
        if (inCount === 0 && outCount === 0 && node.componentType !== 'auth-boundary') {
          issues.push({
            id: `issue-isolated-node-${node.id}`,
            ruleId: 'GRAPH_ISOLATED_COMPONENT',
            severity: 'warning',
            category: 'graph',
            title: `Disconnected Component: ${node.label}`,
            plainEnglishExplanation: `"${node.label}" is sitting alone on your canvas without any connection lines.`,
            technicalExplanation: 'Every active cloud component should participate in data flow or security binding.',
            affectedNodeIds: [node.id],
            affectedEdgeIds: [],
            suggestedCorrection: 'Connect this component to the appropriate application service or delete it if unused.',
            blocksMtaGeneration: false,
          });
        }
      }
    }

    // ========================================================
    // 2. APPLICATION ARCHITECTURE RULES
    // ========================================================

    const userBrowserNodes = nodes.filter((n) => n.componentType === 'user-browser');
    const appRouterNodes = nodes.filter((n) => n.componentType === 'app-router');
    const capServiceNodes = nodes.filter((n) => n.componentType === 'cap-service');
    const nodeServiceNodes = nodes.filter((n) => n.componentType === 'node-service');
    const fioriAppNodes = nodes.filter((n) => n.componentType === 'fiori-app');
    const xsuaaNodes = nodes.filter((n) => n.componentType === 'xsuaa');
    const hanaNodes = nodes.filter((n) => n.componentType === 'hana-cloud');
    const sqliteNodes = nodes.filter((n) => n.componentType === 'sqlite');
    const destinationNodes = nodes.filter((n) => n.componentType === 'destination-service');
    const connectivityNodes = nodes.filter((n) => n.componentType === 'connectivity-service');
    const externalApiNodes = nodes.filter((n) => n.componentType === 'external-api');
    const externalSystemNodes = nodes.filter((n) => n.componentType === 'external-system');

    // 2.1 Missing User / Browser Entrypoint
    if (userBrowserNodes.length === 0) {
      issues.push({
        id: 'issue-missing-client',
        ruleId: 'ARCH_MISSING_ENTRYPOINT',
        severity: 'warning',
        category: 'architecture',
        title: 'Missing User / Browser Entrypoint',
        plainEnglishExplanation: 'Your architecture has no client or user browser component showing where requests start.',
        technicalExplanation: 'An enterprise architecture diagram should illustrate the client layer initiating inbound traffic.',
        affectedNodeIds: [],
        affectedEdgeIds: [],
        suggestedCorrection: 'Add a "User / Browser" component from the Application & UI catalogue.',
        blocksMtaGeneration: false,
      });
    }

    // 2.2 Missing Backend Application Service
    if (capServiceNodes.length === 0 && nodeServiceNodes.length === 0) {
      issues.push({
        id: 'issue-missing-backend-service',
        ruleId: 'ARCH_MISSING_APPLICATION_SERVICE',
        severity: 'error',
        category: 'architecture',
        title: 'Missing Application Backend Service',
        plainEnglishExplanation: 'Your architecture has no backend business service (such as an SAP CAP Service) to execute logic.',
        technicalExplanation: 'An MTA requires at least one server-side execution runtime module.',
        affectedNodeIds: [],
        affectedEdgeIds: [],
        suggestedCorrection: 'Add an "SAP CAP Service" or "Node.js Microservice" from the Application Services category.',
        blocksMtaGeneration: true,
      });
    }

    // 2.3 Missing App Router for Web Clients
    if (userBrowserNodes.length > 0 && appRouterNodes.length === 0) {
      issues.push({
        id: 'issue-missing-approuter',
        ruleId: 'ARCH_MISSING_APPROUTER',
        severity: 'error',
        category: 'architecture',
        title: 'Missing App Router Reverse Proxy',
        plainEnglishExplanation: 'Web traffic from the user browser must enter through an App Router to ensure secure token routing.',
        technicalExplanation:
          'Direct exposure of CAP services without an App Router violates SAP Clean Core security standards and causes CORS failures.',
        affectedNodeIds: userBrowserNodes.map((n) => n.id),
        affectedEdgeIds: [],
        suggestedCorrection: 'Add an "App Router" component between the User/Browser and your backend services.',
        blocksMtaGeneration: true,
      });
    }

    // 2.4 App Router Without Connection to Backend
    for (const router of appRouterNodes) {
      const outEdges = outgoingEdges.get(router.id) || [];
      const hasBackendTarget = outEdges.some((edgeId) => {
        const edge = edges.find((e) => e.id === edgeId);
        if (!edge) return false;
        const target = nodeMap.get(edge.targetNodeId);
        return target && (target.componentType === 'cap-service' || target.componentType === 'node-service');
      });

      if (!hasBackendTarget) {
        issues.push({
          id: `issue-router-unconnected-${router.id}`,
          ruleId: 'ARCH_APPROUTER_NO_BACKEND',
          severity: 'error',
          category: 'architecture',
          title: `App Router "${router.label}" Not Connected to Backend`,
          plainEnglishExplanation: `"${router.label}" is not routing traffic to any backend CAP or Node.js service.`,
          technicalExplanation: 'The App Router xs-app.json routing configuration requires at least one backend destination route.',
          affectedNodeIds: [router.id],
          affectedEdgeIds: [],
          suggestedCorrection: `Draw a connection line from "${router.label}" to your CAP Service.`,
          blocksMtaGeneration: true,
        });
      }
    }

    // 2.5 CAP Service Missing Persistence
    if (capServiceNodes.length > 0 && hanaNodes.length === 0 && sqliteNodes.length === 0) {
      issues.push({
        id: 'issue-cap-missing-persistence',
        ruleId: 'ARCH_CAP_MISSING_PERSISTENCE',
        severity: 'warning',
        category: 'architecture',
        title: 'CAP Service Has No Database Binding',
        plainEnglishExplanation: 'Your CAP Service does not have a database (SAP HANA Cloud or SQLite) connected for data persistence.',
        technicalExplanation: 'Transactional CAP services generally require a database container binding (cds.requires.db).',
        affectedNodeIds: capServiceNodes.map((n) => n.id),
        affectedEdgeIds: [],
        suggestedCorrection: 'Add an "SAP HANA Cloud" database component and connect your CAP service to it.',
        blocksMtaGeneration: false,
      });
    }

    // ========================================================
    // 3. SECURITY & COMPLIANCE RULES
    // ========================================================

    // 3.1 Missing XSUAA Security Service in Cloud Foundry Profiles
    if (profile.targetRuntime === 'Cloud Foundry' && xsuaaNodes.length === 0) {
      issues.push({
        id: 'issue-missing-xsuaa',
        ruleId: 'SEC_MISSING_XSUAA',
        severity: 'error',
        category: 'security',
        title: 'Missing SAP XSUAA Security Service',
        plainEnglishExplanation:
          'Your Cloud Foundry architecture does not have an SAP XSUAA service to handle user authentication and authorization.',
        technicalExplanation:
          'Production Cloud Foundry MTA deployments require an XSUAA resource instance to sign and validate OAuth 2.0 JWT tokens.',
        affectedNodeIds: [...appRouterNodes, ...capServiceNodes].map((n) => n.id),
        affectedEdgeIds: [],
        suggestedCorrection: 'Add an "SAP XSUAA Service" component from the Security catalogue and bind your App Router and CAP service to it.',
        blocksMtaGeneration: true,
      });
    }

    // 3.2 Unbound App Router to XSUAA
    for (const router of appRouterNodes) {
      if (xsuaaNodes.length > 0) {
        const outEdges = outgoingEdges.get(router.id) || [];
        const isBoundToXsuaa = outEdges.some((edgeId) => {
          const edge = edges.find((e) => e.id === edgeId);
          if (!edge) return false;
          const target = nodeMap.get(edge.targetNodeId);
          return target && target.componentType === 'xsuaa';
        });

        if (!isBoundToXsuaa) {
          issues.push({
            id: `issue-router-no-xsuaa-${router.id}`,
            ruleId: 'SEC_APPROUTER_NOT_BOUND_XSUAA',
            severity: 'error',
            category: 'security',
            title: `App Router "${router.label}" Not Bound to XSUAA`,
            plainEnglishExplanation: `"${router.label}" is not connected to XSUAA. Users will not be prompted to log in!`,
            technicalExplanation:
              'Without an XSUAA binding in the MTA requires block, the App Router cannot initiate OAuth 2.0 authorization code flows.',
            affectedNodeIds: [router.id],
            affectedEdgeIds: [],
            suggestedCorrection: `Draw a connection line from "${router.label}" to the SAP XSUAA Service.`,
            blocksMtaGeneration: true,
          });
        }
      }
    }

    // 3.3 Unbound CAP Service to XSUAA (Warning if public, error if production)
    for (const cap of capServiceNodes) {
      if (xsuaaNodes.length > 0) {
        const outEdges = outgoingEdges.get(cap.id) || [];
        const isBoundToXsuaa = outEdges.some((edgeId) => {
          const edge = edges.find((e) => e.id === edgeId);
          if (!edge) return false;
          const target = nodeMap.get(edge.targetNodeId);
          return target && target.componentType === 'xsuaa';
        });

        if (!isBoundToXsuaa) {
          issues.push({
            id: `issue-cap-no-xsuaa-${cap.id}`,
            ruleId: 'SEC_CAP_NOT_BOUND_XSUAA',
            severity: 'warning',
            category: 'security',
            title: `CAP Service "${cap.label}" Not Bound to XSUAA`,
            plainEnglishExplanation: `"${cap.label}" is not bound to XSUAA. Role restrictions (@restrict) cannot be validated.`,
            technicalExplanation:
              'CAP requires an XSUAA binding (service uaa) to read user roles, scopes, and tenant subdomains from the incoming JWT.',
            affectedNodeIds: [cap.id],
            affectedEdgeIds: [],
            suggestedCorrection: `Connect "${cap.label}" to the SAP XSUAA Service so it can verify user permissions.`,
            blocksMtaGeneration: false,
          });
        }
      }
    }

    // 3.4 Disconnected XSUAA Service
    for (const xsuaa of xsuaaNodes) {
      const inCount = incomingEdges.get(xsuaa.id)?.length || 0;
      if (inCount === 0) {
        issues.push({
          id: `issue-xsuaa-unbound-${xsuaa.id}`,
          ruleId: 'SEC_XSUAA_UNBOUND',
          severity: 'warning',
          category: 'security',
          title: 'XSUAA Service Has No Inbound Bindings',
          plainEnglishExplanation: 'An XSUAA service is on your canvas, but no App Router or microservice is bound to it.',
          technicalExplanation: 'The XSUAA resource is declared in the MTA manifest, but no modules list it in their `requires` section.',
          affectedNodeIds: [xsuaa.id],
          affectedEdgeIds: [],
          suggestedCorrection: 'Connect your App Router and CAP Service to the XSUAA component.',
          blocksMtaGeneration: false,
        });
      }
    }

    // 3.5 External Integration Without Destination Service
    if (externalApiNodes.length > 0 || externalSystemNodes.length > 0) {
      if (destinationNodes.length === 0) {
        issues.push({
          id: 'issue-missing-destination-service',
          ruleId: 'SEC_MISSING_DESTINATION_SERVICE',
          severity: 'error',
          category: 'security',
          title: 'Remote Integration Missing Destination Service',
          plainEnglishExplanation:
            'You have connected external APIs or systems, but you do not have an SAP Destination Service to securely store credentials.',
          technicalExplanation:
            'Clean Core prohibits hardcoding remote URLs and credentials in source code. Outbound connections must use the SAP Destination Service.',
          affectedNodeIds: [...externalApiNodes, ...externalSystemNodes].map((n) => n.id),
          affectedEdgeIds: [],
          suggestedCorrection: 'Add a "Destination Service" component and route outbound traffic through it.',
          blocksMtaGeneration: true,
        });
      }
    }

    // 3.6 On-Premise System Without Connectivity Service
    for (const sys of externalSystemNodes) {
      if (sys.configuration?.systemType === 's4hana-onprem' || sys.configuration?.systemType === 'sap-ecc') {
        if (connectivityNodes.length === 0) {
          issues.push({
            id: `issue-onprem-no-connectivity-${sys.id}`,
            ruleId: 'SEC_ONPREM_NO_CONNECTIVITY',
            severity: 'error',
            category: 'security',
            title: `On-Premise System "${sys.label}" Missing Connectivity Service`,
            plainEnglishExplanation:
              'On-premise systems hide behind corporate firewalls. You must include the SAP Connectivity Service (Cloud Connector) to reach them.',
            technicalExplanation:
              'The Cloud Connector tunnel requires the SAP Connectivity Service resource (`com.sap.xs.connectivity`) in Cloud Foundry.',
            affectedNodeIds: [sys.id],
            affectedEdgeIds: [],
            suggestedCorrection: 'Add an "SAP Connectivity Service" component and connect it to your Destination Service.',
            blocksMtaGeneration: true,
          });
        }
      }
    }

    // ========================================================
    // 4. DEPLOYMENT CONFIGURATION & PROFILE RULES
    // ========================================================

    // 4.1 SQLite in Production Cloud Foundry Profile
    if (profile.targetRuntime === 'Cloud Foundry' && sqliteNodes.length > 0) {
      issues.push({
        id: 'issue-sqlite-in-cf-profile',
        ruleId: 'DEP_SQLITE_IN_PRODUCTION_PROFILE',
        severity: 'error',
        category: 'deployment',
        title: 'SQLite Used in Cloud Foundry Production Profile',
        plainEnglishExplanation:
          'SQLite is an embedded file database. Cloud Foundry containers destroy local files whenever they restart, causing complete data loss!',
        technicalExplanation:
          'Cloud Foundry Diego containers have ephemeral local disks. SQLite cannot be deployed in production MTAs. Use SAP HANA Cloud instead.',
        affectedNodeIds: sqliteNodes.map((n) => n.id),
        affectedEdgeIds: [],
        suggestedCorrection: 'Replace the SQLite component with "SAP HANA Cloud" for Cloud Foundry deployment.',
        blocksMtaGeneration: true,
      });
    }

    // 4.2 Profile Requirements: cf-fiori-cap-hana requires Fiori App
    if (profile.id === 'cf-fiori-cap-hana' && fioriAppNodes.length === 0) {
      issues.push({
        id: 'issue-profile-missing-fiori',
        ruleId: 'DEP_PROFILE_MISSING_FIORI',
        severity: 'error',
        category: 'deployment',
        title: 'Selected Profile Requires a Fiori Application',
        plainEnglishExplanation:
          'The "Fiori + CAP Enterprise Application" deployment profile requires at least one SAP Fiori Application on the canvas.',
        technicalExplanation:
          'The selected MTA deployment profile includes the `html5-repo-host` resource and HTML5 deployer module, which require a Fiori app.',
        affectedNodeIds: [],
        affectedEdgeIds: [],
        suggestedCorrection: 'Add an "SAP Fiori Application" component or switch your deployment profile to "CAP + SAP HANA Cloud".',
        blocksMtaGeneration: true,
      });
    }

    // 4.3 Profile Requirements: cf-cap-destination-api requires Destination
    if (profile.id === 'cf-cap-destination-api' && destinationNodes.length === 0) {
      issues.push({
        id: 'issue-profile-missing-destination',
        ruleId: 'DEP_PROFILE_MISSING_DESTINATION',
        severity: 'error',
        category: 'deployment',
        title: 'Selected Profile Requires Destination Service',
        plainEnglishExplanation:
          'The "CAP + Destination / External API" profile requires an SAP Destination Service component.',
        technicalExplanation:
          'The deployment profile explicitly provisions the `destination` managed-service resource and binds it to the CAP backend.',
        affectedNodeIds: [],
        affectedEdgeIds: [],
        suggestedCorrection: 'Add a "Destination Service" component to satisfy the selected deployment profile.',
        blocksMtaGeneration: true,
      });
    }

    // 4.4 Name validation (No spaces or special characters in technical module names)
    for (const node of nodes) {
      const def = COMPONENT_CATALOGUE[node.componentType];
      if (def?.mtaProfileEligible) {
        const rawName = (node.customName || node.label || '').trim();
        if (rawName && !/^[a-zA-Z0-9_.-]+$/.test(rawName)) {
          issues.push({
            id: `issue-invalid-name-${node.id}`,
            ruleId: 'DEP_INVALID_TECHNICAL_NAME',
            severity: 'error',
            category: 'deployment',
            title: `Invalid Technical Name: "${rawName}"`,
            plainEnglishExplanation:
              'MTA module and resource names cannot contain spaces or special characters (except hyphens and underscores).',
            technicalExplanation:
              'The Cloud Foundry MTA specification requires valid DNS-compliant identifiers for module and resource keys.',
            affectedNodeIds: [node.id],
            affectedEdgeIds: [],
            suggestedCorrection: `Change the name of "${rawName}" to use only letters, numbers, and hyphens (e.g. "${rawName.replace(/\s+/g, '-').toLowerCase()}").`,
            blocksMtaGeneration: true,
          });
        }
      }
    }
  } catch (err) {
    // Explicit exception safeguard: never silently succeed if validator crashes
    issues.push({
      id: 'issue-validator-internal-error',
      ruleId: 'INTERNAL_VALIDATOR_EXCEPTION',
      severity: 'error',
      category: 'graph',
      title: 'Validation Engine Internal Exception',
      plainEnglishExplanation: 'An unexpected error occurred while analyzing the architecture graph.',
      technicalExplanation: err instanceof Error ? err.stack || err.message : String(err),
      affectedNodeIds: [],
      affectedEdgeIds: [],
      suggestedCorrection: 'Inspect canvas connections or reset the blueprint to resolve unexpected graph structures.',
      blocksMtaGeneration: true,
    });
  }

  return formatResult(issues);
}

function formatResult(issues: ValidationIssue[]): ValidationResult {
  const errorsCount = issues.filter((i) => i.severity === 'error').length;
  const warningsCount = issues.filter((i) => i.severity === 'warning').length;
  const infoCount = issues.filter((i) => i.severity === 'info').length;

  return {
    isValid: errorsCount === 0,
    hasBlockingErrors: errorsCount > 0,
    issues,
    summary: {
      errorsCount,
      warningsCount,
      infoCount,
    },
    validatedAt: new Date().toISOString(),
  };
}
