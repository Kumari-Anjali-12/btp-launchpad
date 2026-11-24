import { Blueprint } from '../../types/designLab';
import {
  DEFAULT_BLUEPRINTS,
  BLUEPRINT_1_CAP_HANA,
} from '../../data/designLab/defaultBlueprints';

export const BLUEPRINTS_STORAGE_KEY = 'btp_launchpad_blueprints_v1';
export const ACTIVE_BLUEPRINT_ID_KEY = 'btp_launchpad_active_blueprint_id_v1';

/**
 * Loads all blueprints from browser localStorage.
 * Initializes with the 3 canonical default blueprints if no storage exists.
 */
export function loadAllBlueprints(): Blueprint[] {
  if (typeof window === 'undefined' || !window.localStorage) {
    return [...DEFAULT_BLUEPRINTS];
  }

  try {
    const raw = localStorage.getItem(BLUEPRINTS_STORAGE_KEY);
    if (!raw) {
      // First-time initialization
      saveAllBlueprints(DEFAULT_BLUEPRINTS);
      return [...DEFAULT_BLUEPRINTS];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      saveAllBlueprints(DEFAULT_BLUEPRINTS);
      return [...DEFAULT_BLUEPRINTS];
    }

    // Schema migration check
    return parsed.map((bp) => migrateBlueprint(bp));
  } catch (err) {
    console.error('[DesignLab Storage] Corrupted blueprints detected, recovering defaults:', err);
    saveAllBlueprints(DEFAULT_BLUEPRINTS);
    return [...DEFAULT_BLUEPRINTS];
  }
}

/**
 * Persists an array of blueprints to localStorage.
 */
export function saveAllBlueprints(blueprints: Blueprint[]): void {
  if (typeof window === 'undefined' || !window.localStorage) return;

  try {
    localStorage.setItem(BLUEPRINTS_STORAGE_KEY, JSON.stringify(blueprints));
    window.dispatchEvent(new Event('btp_blueprints_updated'));
  } catch (err) {
    console.error('[DesignLab Storage] Failed to save blueprints to localStorage:', err);
  }
}

/**
 * Retrieves a blueprint by ID.
 */
export function loadBlueprintById(id: string): Blueprint | undefined {
  const all = loadAllBlueprints();
  return all.find((b) => b.id === id);
}

/**
 * Saves or updates a blueprint.
 */
export function saveBlueprint(blueprint: Blueprint): Blueprint {
  const all = loadAllBlueprints();
  const updatedBp: Blueprint = {
    ...blueprint,
    updatedAt: new Date().toISOString(),
  };

  const existingIdx = all.findIndex((b) => b.id === blueprint.id);
  if (existingIdx >= 0) {
    all[existingIdx] = updatedBp;
  } else {
    all.push(updatedBp);
  }

  saveAllBlueprints(all);
  setActiveBlueprintId(updatedBp.id);
  return updatedBp;
}

/**
 * Duplicates a blueprint under a new unique ID.
 */
export function duplicateBlueprint(id: string): Blueprint {
  const original = loadBlueprintById(id) || BLUEPRINT_1_CAP_HANA;
  const newId = `bp-copy-${Date.now()}`;
  const duplicate: Blueprint = {
    ...JSON.parse(JSON.stringify(original)),
    id: newId,
    name: `${original.name} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  saveBlueprint(duplicate);
  return duplicate;
}

/**
 * Renames an existing blueprint and optionally updates its description.
 */
export function renameBlueprint(id: string, newName: string, newDescription?: string): Blueprint | undefined {
  const all = loadAllBlueprints();
  const bp = all.find((b) => b.id === id);
  if (!bp) return undefined;

  bp.name = newName;
  if (newDescription !== undefined) {
    bp.description = newDescription;
  }
  bp.updatedAt = new Date().toISOString();
  saveAllBlueprints(all);
  return bp;
}

/**
 * Deletes a blueprint by ID with safety fallback.
 */
export function deleteBlueprint(id: string): Blueprint {
  const all = loadAllBlueprints();
  const filtered = all.filter((b) => b.id !== id);

  if (filtered.length === 0 || !filtered[0]) {
    // Prevent zero blueprints; restore defaults
    saveAllBlueprints(DEFAULT_BLUEPRINTS);
    return DEFAULT_BLUEPRINTS[0] || BLUEPRINT_1_CAP_HANA;
  }

  saveAllBlueprints(filtered);
  return filtered[0];
}

/**
 * Resets all blueprints back to the canonical defaults.
 */
export function resetToDefaultBlueprints(): Blueprint[] {
  saveAllBlueprints(DEFAULT_BLUEPRINTS);
  const first = DEFAULT_BLUEPRINTS[0] || BLUEPRINT_1_CAP_HANA;
  setActiveBlueprintId(first.id);
  return [...DEFAULT_BLUEPRINTS];
}

/**
 * Gets the active blueprint ID.
 */
export function getActiveBlueprintId(): string {
  if (typeof window === 'undefined' || !window.localStorage) {
    return BLUEPRINT_1_CAP_HANA.id;
  }

  return localStorage.getItem(ACTIVE_BLUEPRINT_ID_KEY) || BLUEPRINT_1_CAP_HANA.id;
}

/**
 * Sets the active blueprint ID.
 */
export function setActiveBlueprintId(id: string): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  localStorage.setItem(ACTIVE_BLUEPRINT_ID_KEY, id);
}

/**
 * Exports a blueprint as a downloadable JSON file.
 */
export function exportBlueprintJson(blueprint: Blueprint): string {
  const dataStr = JSON.stringify(blueprint, null, 2);
  if (typeof window !== 'undefined' && typeof window.Blob !== 'undefined' && typeof URL.createObjectURL === 'function') {
    const blob = new Blob([dataStr], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${blueprint.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-blueprint.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  return dataStr;
}

/**
 * Imports a blueprint from JSON string.
 */
export function importBlueprintJson(jsonString: string): {
  success: boolean;
  blueprint?: Blueprint;
  error?: string;
} {
  try {
    const parsed = JSON.parse(jsonString);

    if (!parsed || typeof parsed !== 'object') {
      return { success: false, error: 'File contents are not a valid JSON object.' };
    }

    if (!Array.isArray(parsed.nodes) || !Array.isArray(parsed.edges)) {
      return { success: false, error: 'JSON does not contain required "nodes" and "edges" arrays.' };
    }

    const migrated = migrateBlueprint(parsed);
    const newId = `bp-imported-${Date.now()}`;
    const newBlueprint: Blueprint = {
      ...migrated,
      id: newId,
      name: `${migrated.name || 'Imported Architecture'}`,
      updatedAt: new Date().toISOString(),
    };

    saveBlueprint(newBlueprint);
    return { success: true, blueprint: newBlueprint };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Invalid JSON file.' };
  }
}

/**
 * Schema migration helper for blueprints.
 */
function migrateBlueprint(raw: Record<string, unknown>): Blueprint {
  return {
    id: String(raw.id || `bp-${Date.now()}`),
    schemaVersion: 1,
    name: String(raw.name || 'Untitled Architecture'),
    description: String(raw.description || ''),
    createdAt: String(raw.createdAt || new Date().toISOString()),
    updatedAt: String(raw.updatedAt || new Date().toISOString()),
    deploymentProfile: (raw.deploymentProfile as Blueprint['deploymentProfile']) || 'cf-cap-hana',
    nodes: Array.isArray(raw.nodes) ? (raw.nodes as Blueprint['nodes']) : [],
    edges: Array.isArray(raw.edges) ? (raw.edges as Blueprint['edges']) : [],
  };
}
