import { describe, it, expect, beforeEach } from 'vitest';
import { COMPONENT_CATALOGUE } from '../data/designLab/catalogue';
import { isValidConnection, isForbiddenConnection, VALID_CONNECTION_RULES } from '../data/designLab/connectionRules';
import {
  DEFAULT_BLUEPRINTS,
  BLUEPRINT_1_CAP_HANA,
  BLUEPRINT_2_FIORI_CAP_HANA,
  BLUEPRINT_3_CAP_DESTINATION_API,
} from '../data/designLab/defaultBlueprints';
import { validateArchitecture } from '../lib/designLab/validator';
import { generateMtaDescriptor } from '../lib/designLab/mtaGenerator';
import { parseAndValidateMtaYaml } from '../lib/designLab/yamlParser';
import {
  loadAllBlueprints,
  saveBlueprint,
  duplicateBlueprint,
  renameBlueprint,
  deleteBlueprint,
  resetToDefaultBlueprints,
  exportBlueprintJson,
  importBlueprintJson,
} from '../lib/designLab/blueprintStorage';
import { Blueprint } from '../types/designLab';

describe('Design Lab: Component Catalogue & Metadata', () => {
  it('contains at least 16 canonical SAP BTP components', () => {
    const keys = Object.keys(COMPONENT_CATALOGUE);
    expect(keys.length).toBeGreaterThanOrEqual(16);
  });

  it('verifies essential BTP components exist with complete educational metadata', () => {
    const requiredTypes = [
      'user-browser',
      'fiori-app',
      'ui5-app',
      'app-router',
      'cap-service',
      'node-service',
      'external-api',
      'xsuaa',
      'auth-boundary',
      'role-scope-config',
      'hana-cloud',
      'sqlite',
      'destination-service',
      'connectivity-service',
      'external-system',
      'cf-app',
      'mta-app',
      'service-instance',
    ];

    requiredTypes.forEach((type) => {
      const def = COMPONENT_CATALOGUE[type];
      expect(def, `Component definition for ${type} must exist`).toBeDefined();
      if (!def) return;
      expect(def.type).toBe(type);
      expect(def.displayName.length).toBeGreaterThan(0);
      expect(def.category).toBeDefined();
      expect(def.plainEnglishDescription.length).toBeGreaterThan(10);
      expect(def.realWorldAnalogy.metaphor.length).toBeGreaterThan(5);
      expect(def.realWorldAnalogy.explanation.length).toBeGreaterThan(10);
      expect(def.technicalExplanation.length).toBeGreaterThan(15);
      expect(Array.isArray(def.configurationFields)).toBe(true);
      expect(Array.isArray(def.supportedConnectionTypes)).toBe(true);
    });
  });
});

describe('Design Lab: Connection Rules Matrix', () => {
  it('validates legitimate enterprise connection paths', () => {
    expect(Boolean(isValidConnection('user-browser', 'app-router'))).toBe(true);
    expect(Boolean(isValidConnection('app-router', 'cap-service'))).toBe(true);
    expect(Boolean(isValidConnection('cap-service', 'hana-cloud'))).toBe(true);
    expect(Boolean(isValidConnection('cap-service', 'xsuaa'))).toBe(true);
    expect(Boolean(isValidConnection('cap-service', 'destination-service'))).toBe(true);
    expect(Boolean(isValidConnection('destination-service', 'connectivity-service'))).toBe(true);
  });

  it('identifies and blocks architectural anti-patterns with actionable reasons', () => {
    // Direct browser to database bypass
    const dbBypass = isForbiddenConnection('user-browser', 'hana-cloud');
    expect(dbBypass.forbidden).toBe(true);
    expect(dbBypass.reason).toMatch(/security violation/i);

    // Fiori app directly to database bypass
    const fioriDbBypass = isForbiddenConnection('fiori-app', 'hana-cloud');
    expect(fioriDbBypass.forbidden).toBe(true);

    // Database directly calling browser
    const dbToBrowser = isForbiddenConnection('hana-cloud', 'user-browser');
    expect(dbToBrowser.forbidden).toBe(true);
  });

  it('checks rule count in matrix', () => {
    expect(VALID_CONNECTION_RULES.length).toBeGreaterThanOrEqual(15);
  });
});

describe('Design Lab: Validation Engine', () => {
  it('reports informational status for an empty blueprint', () => {
    const emptyBlueprint: Blueprint = {
      id: 'empty-test',
      name: 'Empty Blueprint',
      description: 'Testing empty canvas',
      schemaVersion: 1,
      deploymentProfile: 'cf-cap-hana',
      nodes: [],
      edges: [],
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
    };

    const result = validateArchitecture(emptyBlueprint);
    expect(result.summary.infoCount).toBeGreaterThanOrEqual(1);
    expect(result.issues.some((i) => i.id === 'issue-empty-canvas')).toBe(true);
  });

  it('detects orphan disconnected nodes when multiple nodes exist', () => {
    const blueprint: Blueprint = {
      id: 'orphan-test',
      name: 'Orphan Test',
      description: 'Multiple nodes with one isolated',
      schemaVersion: 1,
      deploymentProfile: 'cf-cap-hana',
      nodes: [
        {
          id: 'node-cap-1',
          componentType: 'cap-service',
          label: 'SAP CAP Service',
          customName: 'cap-srv',
          position: { x: 100, y: 100 },
          configuration: {},
        },
        {
          id: 'node-isolated-1',
          componentType: 'destination-service',
          label: 'SAP Destination Service',
          customName: 'dest-srv',
          position: { x: 300, y: 100 },
          configuration: {},
        },
      ],
      edges: [],
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
    };

    const result = validateArchitecture(blueprint);
    expect(result.summary.warningsCount).toBeGreaterThanOrEqual(1);
    expect(result.issues.some((i) => i.ruleId === 'GRAPH_ISOLATED_COMPONENT')).toBe(true);
  });

  it('blocks SQLite in production Cloud Foundry deployment profile', () => {
    const blueprint: Blueprint = {
      id: 'sqlite-test',
      name: 'SQLite in CF Test',
      description: 'Invalid production database',
      schemaVersion: 1,
      deploymentProfile: 'cf-cap-hana',
      nodes: [
        {
          id: 'node-router',
          componentType: 'app-router',
          label: 'App Router',
          position: { x: 50, y: 100 },
          configuration: {},
        },
        {
          id: 'node-cap',
          componentType: 'cap-service',
          label: 'CAP Backend',
          customName: 'cap-srv',
          position: { x: 200, y: 100 },
          configuration: {},
        },
        {
          id: 'node-sqlite',
          componentType: 'sqlite',
          label: 'Local SQLite',
          customName: 'sqlite-db',
          position: { x: 400, y: 100 },
          configuration: {},
        },
      ],
      edges: [
        {
          id: 'edge-1',
          sourceNodeId: 'node-router',
          targetNodeId: 'node-cap',
          connectionType: 'http-route',
        },
        {
          id: 'edge-2',
          sourceNodeId: 'node-cap',
          targetNodeId: 'node-sqlite',
          connectionType: 'service-binding',
        },
      ],
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
    };

    const result = validateArchitecture(blueprint);
    expect(result.isValid).toBe(false);
    expect(result.summary.errorsCount).toBeGreaterThanOrEqual(1);
    expect(result.issues.some((i) => i.ruleId === 'DEP_SQLITE_IN_PRODUCTION_PROFILE')).toBe(true);
  });

  it('validates Acceptance Blueprint 1: Basic CAP + HANA Application with 0 blocking errors', () => {
    const result = validateArchitecture(BLUEPRINT_1_CAP_HANA);
    expect(result.summary.errorsCount).toBe(0);
    expect(result.isValid).toBe(true);
  });

  it('validates Acceptance Blueprint 2: Fiori + CAP Enterprise Application with 0 blocking errors', () => {
    const result = validateArchitecture(BLUEPRINT_2_FIORI_CAP_HANA);
    expect(result.summary.errorsCount).toBe(0);
    expect(result.isValid).toBe(true);
  });

  it('validates Acceptance Blueprint 3: CAP + External API Integration with 0 blocking errors', () => {
    const result = validateArchitecture(BLUEPRINT_3_CAP_DESTINATION_API);
    expect(result.summary.errorsCount).toBe(0);
    expect(result.isValid).toBe(true);
  });
});

describe('Design Lab: MTA Generator & YAML Validator', () => {
  it('generates compliant MTA descriptor for Blueprint 1 (CAP + HANA)', () => {
    const mtaOutput = generateMtaDescriptor(BLUEPRINT_1_CAP_HANA);
    expect(mtaOutput.isBlocked).toBe(false);
    expect(mtaOutput.yaml.length).toBeGreaterThan(100);

    // Structural and semantic validation
    expect(mtaOutput.validation.isStructurallyValid).toBe(true);
    expect(mtaOutput.validation.isSemanticallyValid).toBe(true);
    expect(mtaOutput.descriptor.schemaVersion).toBe('3.1.0');
    expect(mtaOutput.descriptor.id).toBe('basic-cap-hana-application');

    // Modules verification
    expect(mtaOutput.descriptor.modules.length).toBeGreaterThanOrEqual(2);
    expect(mtaOutput.yaml).toContain('name: orders-srv');
    expect(mtaOutput.yaml).toContain('name: orders-db-deployer');
    expect(mtaOutput.yaml).toContain('type: com.sap.xs.hana');
  });

  it('generates compliant MTA descriptor for Blueprint 2 (Fiori + CAP + App Router)', () => {
    const mtaOutput = generateMtaDescriptor(BLUEPRINT_2_FIORI_CAP_HANA);
    expect(mtaOutput.isBlocked).toBe(false);
    expect(mtaOutput.validation.isStructurallyValid).toBe(true);
    expect(mtaOutput.validation.isSemanticallyValid).toBe(true);
    expect(mtaOutput.descriptor.id).toBe('fiori-cap-enterprise-application');

    // Verify UI & App Router integration
    expect(mtaOutput.yaml).toContain('name: enterprise-approuter');
    expect(mtaOutput.yaml).toContain('name: manageorders-deployer');
    expect(mtaOutput.yaml).toContain('name: enterprise-uaa');
  });

  it('generates compliant MTA descriptor for Blueprint 3 (CAP + Destination + Connectivity)', () => {
    const mtaOutput = generateMtaDescriptor(BLUEPRINT_3_CAP_DESTINATION_API);
    expect(mtaOutput.isBlocked).toBe(false);
    expect(mtaOutput.validation.isStructurallyValid).toBe(true);
    expect(mtaOutput.validation.isSemanticallyValid).toBe(true);

    expect(mtaOutput.yaml).toContain('name: ext-destination');
  });

  it('blocks MTA generation for standalone-dev profile with clear explanation', () => {
    const devBlueprint: Blueprint = {
      ...BLUEPRINT_1_CAP_HANA,
      id: 'local-dev-bp',
      deploymentProfile: 'standalone-dev',
    };

    const mtaOutput = generateMtaDescriptor(devBlueprint);
    expect(mtaOutput.isBlocked).toBe(true);
    expect(mtaOutput.blockingReason).toMatch(/SQLite is not deployable/i);
    expect(mtaOutput.yaml).toContain('MTA Generation Disabled for Local Development Profile');
  });

  it('verifies YAML parser correctly detects structural syntax errors', () => {
    const malformedYaml = `_schema-version: '3.1.0'
ID: test-mta
modules:
  - name: app
    type: nodejs
    requires:
      - name: missing-res
resources: []`;

    const parsed = parseAndValidateMtaYaml(malformedYaml);
    expect(parsed.isSemanticallyValid).toBe(false);
    expect(parsed.semanticErrors.length).toBeGreaterThan(0);
    expect(parsed.semanticErrors[0]).toMatch(/missing-res/i);
  });
});

describe('Design Lab: Blueprint Storage Engine & Persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads default acceptance blueprints when storage is fresh', () => {
    const blueprints = loadAllBlueprints();
    expect(blueprints.length).toBe(DEFAULT_BLUEPRINTS.length);
    expect(blueprints[0]?.id).toBe(BLUEPRINT_1_CAP_HANA.id);
    expect(blueprints[1]?.id).toBe(BLUEPRINT_2_FIORI_CAP_HANA.id);
    expect(blueprints[2]?.id).toBe(BLUEPRINT_3_CAP_DESTINATION_API.id);
  });

  it('saves and updates blueprint modifications in localStorage', () => {
    const blueprints = loadAllBlueprints();
    const first = blueprints[0];
    expect(first).toBeDefined();
    if (!first) return;
    const modified: Blueprint = { ...first, name: 'Custom Name CAP' };
    saveBlueprint(modified);

    const reloaded = loadAllBlueprints();
    const found = reloaded.find((b) => b.id === modified.id);
    expect(found?.name).toBe('Custom Name CAP');
  });

  it('duplicates blueprint cleanly with new unique ID and copy label', () => {
    const duplicated = duplicateBlueprint(BLUEPRINT_1_CAP_HANA.id);
    expect(duplicated).not.toBeNull();
    expect(duplicated?.id).not.toBe(BLUEPRINT_1_CAP_HANA.id);
    expect(duplicated?.name).toContain('(Copy)');

    const reloaded = loadAllBlueprints();
    expect(reloaded.some((b) => b.id === duplicated?.id)).toBe(true);
  });

  it('renames an existing blueprint', () => {
    const duplicated = duplicateBlueprint(BLUEPRINT_1_CAP_HANA.id);
    const renamed = renameBlueprint(duplicated.id, 'Renamed Architecture', 'Updated description');
    expect(renamed?.name).toBe('Renamed Architecture');
    expect(renamed?.description).toBe('Updated description');
  });

  it('deletes blueprint and handles boundary condition', () => {
    const duplicated = duplicateBlueprint(BLUEPRINT_1_CAP_HANA.id);
    deleteBlueprint(duplicated.id);

    const reloaded = loadAllBlueprints();
    expect(reloaded.some((b) => b.id === duplicated.id)).toBe(false);
  });

  it('resets blueprints to defaults successfully', () => {
    duplicateBlueprint(BLUEPRINT_1_CAP_HANA.id);
    const defaults = resetToDefaultBlueprints();
    expect(defaults.length).toBe(DEFAULT_BLUEPRINTS.length);
  });

  it('exports and imports blueprint as JSON correctly', () => {
    const jsonStr = exportBlueprintJson(BLUEPRINT_1_CAP_HANA);
    expect(jsonStr).toContain(BLUEPRINT_1_CAP_HANA.id);

    const importResult = importBlueprintJson(jsonStr);
    expect(importResult.success).toBe(true);
    expect(importResult.blueprint?.name).toBe(BLUEPRINT_1_CAP_HANA.name);
    expect(importResult.blueprint?.nodes.length).toBe(BLUEPRINT_1_CAP_HANA.nodes.length);
  });

  it('rejects invalid JSON during import', () => {
    const result = importBlueprintJson('{"invalid": true}');
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/nodes/i);
  });
});
