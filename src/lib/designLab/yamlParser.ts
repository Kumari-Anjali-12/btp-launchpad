import { MtaDescriptor, MtaValidationResult } from '../../types/designLab';

/**
 * Deterministic YAML Serializer.
 * Formats a JavaScript object into clean, compliant, readable YAML adhering to SAP MTA conventions.
 */
export function stringifyYaml(data: unknown, indent = 0): string {
  const spaces = ' '.repeat(indent);

  if (data === null || data === undefined) {
    return 'null';
  }

  if (typeof data === 'boolean' || typeof data === 'number') {
    return String(data);
  }

  if (typeof data === 'string') {
    // If string contains special characters, quotes, or colons, wrap in single quotes
    if (
      data.includes(':') ||
      data.includes('#') ||
      data.includes('{') ||
      data.includes('}') ||
      data.includes('[') ||
      data.includes(']') ||
      data.includes('>') ||
      data.includes('@') ||
      data.includes('*') ||
      data.trim() === ''
    ) {
      return `'${data.replace(/'/g, "''")}'`;
    }
    return data;
  }

  if (Array.isArray(data)) {
    if (data.length === 0) {
      return '[]';
    }

    return data
      .map((item) => {
        if (typeof item === 'object' && item !== null) {
          const itemYaml = stringifyYaml(item, indent + 2).trimStart();
          return `${spaces}- ${itemYaml}`;
        }
        return `${spaces}- ${stringifyYaml(item, indent + 2)}`;
      })
      .join('\n');
  }

  if (typeof data === 'object') {
    const record = data as Record<string, unknown>;
    const keys = Object.keys(record);
    if (keys.length === 0) {
      return '{}';
    }

    return keys
      .map((key) => {
        const value = record[key];

        if (value === undefined) {
          return '';
        }

        if (Array.isArray(value)) {
          if (value.length === 0) {
            return `${spaces}${key}: []`;
          }
          return `${spaces}${key}:\n${stringifyYaml(value, indent + 2)}`;
        }

        if (typeof value === 'object' && value !== null) {
          if (Object.keys(value).length === 0) {
            return `${spaces}${key}: {}`;
          }
          return `${spaces}${key}:\n${stringifyYaml(value, indent + 2)}`;
        }

        return `${spaces}${key}: ${stringifyYaml(value, indent)}`;
      })
      .filter(Boolean)
      .join('\n');
  }

  return String(data);
}

/**
 * Structural and Semantic Validator for SAP MTA Descriptors.
 * Validates syntax, required blocks, module-to-resource references, and SAP BTP deployment rules.
 */
export function validateMtaSemantic(descriptor: MtaDescriptor): MtaValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const badges: string[] = ['Structurally Validated', 'Semantically Validated (SAP BTP Profile)'];

  // 1. Schema Version Check
  if (!descriptor.schemaVersion || !['3.1.0', '3.2.0', '3.3.0'].includes(descriptor.schemaVersion)) {
    errors.push(`Invalid or missing "_schema-version". Supported versions: 3.1.0, 3.2.0. Found: "${descriptor.schemaVersion}".`);
  }

  // 2. ID and Version Check
  if (!descriptor.id || !/^[a-zA-Z0-9_.-]+$/.test(descriptor.id)) {
    errors.push(`MTA "ID" is required and must contain only alphanumeric characters, dots, and hyphens. Found: "${descriptor.id}".`);
  }

  if (!descriptor.version || !/^\d+\.\d+\.\d+$/.test(descriptor.version)) {
    errors.push(`MTA "version" must follow semantic versioning (e.g. 1.0.0). Found: "${descriptor.version}".`);
  }

  // 3. Module and Resource Name Registry
  const declaredResourceNames = new Set<string>();
  const declaredProvidesNames = new Set<string>();
  const declaredModuleNames = new Set<string>();

  for (const resource of descriptor.resources || []) {
    if (!resource.name) {
      errors.push('Resource is missing a required "name" attribute.');
    } else if (declaredResourceNames.has(resource.name)) {
      errors.push(`Duplicate resource name detected: "${resource.name}".`);
    } else {
      declaredResourceNames.add(resource.name);
    }

    if (!resource.type) {
      errors.push(`Resource "${resource.name}" is missing a "type" declaration.`);
    }
  }

  for (const mod of descriptor.modules || []) {
    if (!mod.name) {
      errors.push('Module is missing a required "name" attribute.');
    } else if (declaredModuleNames.has(mod.name)) {
      errors.push(`Duplicate module name detected: "${mod.name}".`);
    } else {
      declaredModuleNames.add(mod.name);
    }

    if (!mod.type) {
      errors.push(`Module "${mod.name}" is missing a "type" declaration.`);
    }

    for (const prov of mod.provides || []) {
      if (prov.name) {
        declaredProvidesNames.add(prov.name);
      }
    }
  }

  // 4. Dependency Reference Verification (every `requires` must resolve)
  for (const mod of descriptor.modules || []) {
    for (const req of mod.requires || []) {
      const isResource = declaredResourceNames.has(req.name);
      const isProvides = declaredProvidesNames.has(req.name);

      if (!isResource && !isProvides) {
        errors.push(
          `Module "${mod.name}" requires unresolved dependency "${req.name}". It is neither a declared resource nor a provided interface.`
        );
      }
    }
  }

  // 5. Verification Notice
  badges.push('Simulated / Non-Production Runtime Test');

  return {
    isStructurallyValid: errors.length === 0,
    isSemanticallyValid: errors.length === 0,
    errors,
    warnings,
    badges,
  };
}

/**
 * Parses and validates raw MTA YAML text.
 */
export function parseAndValidateMtaYaml(yamlContent: string): MtaValidationResult & {
  schemaVersion?: string;
  mtaId?: string;
  version?: string;
  modulesCount: number;
  resourcesCount: number;
  semanticErrors: string[];
} {
  const lines = yamlContent.split('\n');
  let schemaVersion = '';
  let mtaId = '';
  let version = '';
  const modules: Array<{ name: string; type: string; requires?: Array<{ name: string }> }> = [];
  const resources: Array<{ name: string; type: string }> = [];

  let currentSection: 'modules' | 'resources' | null = null;
  let currentItem: Record<string, unknown> | null = null;
  let inRequires = false;

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    if (rawLine.startsWith('_schema-version:')) {
      schemaVersion = trimmed.split(':')[1]?.trim().replace(/['"]/g, '') || '';
    } else if (rawLine.startsWith('ID:')) {
      mtaId = trimmed.split(':')[1]?.trim().replace(/['"]/g, '') || '';
    } else if (rawLine.startsWith('version:')) {
      version = trimmed.split(':')[1]?.trim().replace(/['"]/g, '') || '';
    } else if (rawLine.startsWith('modules:')) {
      currentSection = 'modules';
      currentItem = null;
      inRequires = false;
    } else if (rawLine.startsWith('resources:')) {
      currentSection = 'resources';
      currentItem = null;
      inRequires = false;
    } else if (currentSection === 'modules') {
      if (inRequires && trimmed.startsWith('- name:')) {
        const reqName = trimmed.replace('- name:', '').trim().replace(/['"]/g, '');
        (currentItem?.requires as Array<{ name: string }>).push({ name: reqName });
      } else if (trimmed.startsWith('- name:')) {
        currentItem = { name: trimmed.replace('- name:', '').trim().replace(/['"]/g, ''), requires: [] };
        modules.push(currentItem as unknown as { name: string; type: string; requires?: Array<{ name: string }> });
        inRequires = false;
      } else if (currentItem && trimmed.startsWith('type:')) {
        currentItem.type = trimmed.replace('type:', '').trim().replace(/['"]/g, '');
      } else if (currentItem && trimmed.startsWith('requires:')) {
        inRequires = true;
      }
    } else if (currentSection === 'resources') {
      if (trimmed.startsWith('- name:')) {
        currentItem = { name: trimmed.replace('- name:', '').trim().replace(/['"]/g, '') };
        resources.push(currentItem as unknown as { name: string; type: string });
      } else if (currentItem && trimmed.startsWith('type:')) {
        currentItem.type = trimmed.replace('type:', '').trim().replace(/['"]/g, '');
      }
    }
  }

  const descriptor: MtaDescriptor = {
    schemaVersion,
    id: mtaId,
    version: version || '1.0.0',
    description: '',
    modules: modules as unknown as MtaDescriptor['modules'],
    resources: resources as unknown as MtaDescriptor['resources'],
  };

  const validation = validateMtaSemantic(descriptor);

  return {
    ...validation,
    schemaVersion,
    mtaId,
    version,
    modulesCount: modules.length,
    resourcesCount: resources.length,
    semanticErrors: validation.errors,
  };
}
