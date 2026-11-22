import { CdsEntityDef, CdsFieldDef, CdsParseResult, CdsError } from '../../types/practice';

const VALID_BUILTIN_TYPES = new Set([
  'uuid',
  'string',
  'integer',
  'integer64',
  'int16',
  'int32',
  'int64',
  'decimal',
  'boolean',
  'date',
  'time',
  'datetime',
  'timestamp',
  'binary',
  'largebinary',
  'largetext',
]);

/**
 * Safely validates Core Data Services (CDS) model syntax without code execution.
 * Parses entities, fields, keys, aspects (cuid, managed), associations, and compositions.
 */
export function validateCdsCode(code: string): CdsParseResult {
  const errors: CdsError[] = [];
  const entities: CdsEntityDef[] = [];
  let namespace: string | undefined = undefined;

  const rawLines = code.split('\n');

  // Strip block comments while maintaining line counts
  let inBlockComment = false;
  const sanitizedLines = rawLines.map((line) => {
    let current = line;

    if (inBlockComment) {
      const endCommentIdx = current.indexOf('*/');
      if (endCommentIdx !== -1) {
        inBlockComment = false;
        current = ' '.repeat(endCommentIdx + 2) + current.slice(endCommentIdx + 2);
      } else {
        return '';
      }
    }

    const startCommentIdx = current.indexOf('/*');
    if (startCommentIdx !== -1) {
      const endCommentIdx = current.indexOf('*/', startCommentIdx + 2);
      if (endCommentIdx !== -1) {
        current =
          current.slice(0, startCommentIdx) +
          ' '.repeat(endCommentIdx - startCommentIdx + 2) +
          current.slice(endCommentIdx + 2);
      } else {
        inBlockComment = true;
        current = current.slice(0, startCommentIdx);
      }
    }

    // Strip line comments
    const lineCommentIdx = current.indexOf('//');
    if (lineCommentIdx !== -1) {
      current = current.slice(0, lineCommentIdx);
    }

    return current;
  });

  // Extract namespace if present
  for (let i = 0; i < sanitizedLines.length; i++) {
    const rawLine = sanitizedLines[i];
    if (!rawLine) continue;
    const trimmed = rawLine.trim();
    if (trimmed.startsWith('namespace ')) {
      const match = trimmed.match(/^namespace\s+([a-zA-Z0-9_.]+)\s*;?$/);
      if (match && match[1]) {
        namespace = match[1];
        if (!trimmed.endsWith(';')) {
          errors.push({
            line: i + 1,
            message: `Namespace declaration missing trailing semicolon: 'namespace ${match[1]};'`,
            severity: 'error',
          });
        }
      } else {
        errors.push({
          line: i + 1,
          message: "Invalid namespace declaration. Format should be: 'namespace sap.launchpad;'",
          severity: 'error',
        });
      }
      break;
    }
  }

  // Parse entities
  let i = 0;
  while (i < sanitizedLines.length) {
    const currentLine = sanitizedLines[i];
    if (!currentLine) {
      i++;
      continue;
    }
    const line = currentLine.trim();

    if (line.startsWith('entity ') || line.match(/^(?:key\s+)?entity\s+/)) {
      const startLineNum = i + 1;
      let fullHeader = line;
      let headerEndLine = i;

      while (!fullHeader.includes('{') && headerEndLine + 1 < sanitizedLines.length) {
        headerEndLine++;
        const nextHeaderLine = sanitizedLines[headerEndLine];
        if (nextHeaderLine !== undefined) {
          fullHeader += ' ' + nextHeaderLine.trim();
        }
      }

      const entityHeaderMatch = fullHeader.match(/^entity\s+([A-Za-z0-9_]+)(?:\s*:\s*([A-Za-z0-9_,\s]+))?\s*\{/);

      if (!entityHeaderMatch || !entityHeaderMatch[1]) {
        errors.push({
          line: startLineNum,
          message: `Malformed entity declaration: '${line}'. Expected: 'entity EntityName { ... }'`,
          severity: 'error',
        });
        i++;
        continue;
      }

      const entityName = entityHeaderMatch[1];
      const aspectsRaw = entityHeaderMatch[2] || '';
      const aspects = aspectsRaw.split(',').map((a) => a.trim().toLowerCase());
      const isAspectCuid = aspects.includes('cuid');
      const isAspectManaged = aspects.includes('managed');

      const entityFields: CdsFieldDef[] = [];
      let braceDepth = 1;
      let curr = headerEndLine + 1;
      let entityClosed = false;

      while (curr < sanitizedLines.length) {
        const bodyRaw = sanitizedLines[curr];
        if (bodyRaw === undefined) {
          curr++;
          continue;
        }
        const bodyLine = bodyRaw.trim();

        if (bodyLine.includes('{')) {
          braceDepth++;
        }
        if (bodyLine.includes('}')) {
          braceDepth--;
          if (braceDepth === 0) {
            entityClosed = true;
            i = curr + 1;
            break;
          }
        }

        if (bodyLine.length > 0 && !bodyLine.startsWith('}')) {
          if (!bodyLine.endsWith(';')) {
            errors.push({
              line: curr + 1,
              message: `Missing trailing semicolon on element definition: '${bodyLine}'`,
              severity: 'error',
            });
          }

          const cleanField = bodyLine.replace(/;$/, '').trim();

          const assocMatch = cleanField.match(
            /^(key\s+)?([A-Za-z0-9_]+)\s*:\s*(Association\s+to|Composition\s+of)\s+(?:(many|one)\s+)?([A-Za-z0-9_.]+)(?:\s+on\s+.+)?$/i
          );

          if (assocMatch && assocMatch[2] && assocMatch[3] && assocMatch[5]) {
            const isKey = Boolean(assocMatch[1]);
            const fieldName = assocMatch[2];
            const relType = assocMatch[3].toLowerCase();
            const cardinality = assocMatch[4]?.toLowerCase() === 'many' ? 'many' : 'one';
            const target = assocMatch[5];

            entityFields.push({
              name: fieldName,
              isKey,
              type: relType.startsWith('comp') ? 'Composition' : 'Association',
              isComposition: relType.startsWith('comp'),
              isAssociation: !relType.startsWith('comp'),
              target,
              cardinality,
            });
          } else {
            const standardFieldMatch = cleanField.match(/^(key\s+)?([A-Za-z0-9_]+)\s*:\s*([A-Za-z0-9_(),\s]+)$/);
            if (standardFieldMatch && standardFieldMatch[2] && standardFieldMatch[3]) {
              const isKey = Boolean(standardFieldMatch[1]);
              const fieldName = standardFieldMatch[2];
              const rawType = standardFieldMatch[3].trim();
              const baseType = rawType.replace(/\(.*\)$/, '').trim().toLowerCase();

              if (!VALID_BUILTIN_TYPES.has(baseType)) {
                errors.push({
                  line: curr + 1,
                  message: `Unknown or unsupported CDS type '${rawType}' on property '${fieldName}'. Expected types: UUID, String, Integer, Decimal, Boolean, Date, Timestamp`,
                  severity: 'warning',
                });
              }

              if (entityFields.some((f) => f.name.toLowerCase() === fieldName.toLowerCase())) {
                errors.push({
                  line: curr + 1,
                  message: `Duplicate element name '${fieldName}' in entity '${entityName}'.`,
                  severity: 'error',
                });
              }

              entityFields.push({
                name: fieldName,
                isKey,
                type: rawType,
              });
            } else if (bodyLine.length > 0 && !bodyLine.startsWith('{') && !bodyLine.startsWith('}')) {
              errors.push({
                line: curr + 1,
                message: `Invalid element syntax: '${bodyLine}'. Expected: '<name> : <Type>;' or 'key <name> : <Type>;'`,
                severity: 'error',
              });
            }
          }
        }
        curr++;
      }

      if (!entityClosed) {
        errors.push({
          line: startLineNum,
          message: `Unclosed entity '${entityName}'. Missing closing brace '}'.`,
          severity: 'error',
        });
        i = curr;
      }

      const hasKey = isAspectCuid || entityFields.some((f) => f.isKey);
      if (!hasKey) {
        errors.push({
          line: startLineNum,
          message: `Entity '${entityName}' has no primary key. Add 'key <name> : UUID;' or extend ': cuid'.`,
          severity: 'warning',
        });
      }

      entities.push({
        name: entityName,
        isAspectCuid,
        isAspectManaged,
        fields: entityFields,
      });
      continue;
    }

    i++;
  }

  if (entities.length === 0 && errors.length === 0 && code.trim().length > 0) {
    errors.push({
      line: 1,
      message: "No CDS entities found. Start by defining an entity, e.g., 'entity Books { key ID: UUID; }'",
      severity: 'error',
    });
  }

  const valid = errors.filter((e) => e.severity === 'error').length === 0;

  const sqlPreview = generateSqlPreview(namespace, entities);
  const odataEdmxPreview = generateEdmxPreview(namespace, entities);

  return {
    valid,
    errors,
    namespace,
    entities,
    sqlPreview,
    odataEdmxPreview,
  };
}

function generateSqlPreview(namespace: string | undefined, entities: CdsEntityDef[]): string {
  if (entities.length === 0) return '-- No entities compiled yet.';

  const prefix = namespace ? namespace.replace(/\./g, '_') + '_' : '';

  return entities
    .map((ent) => {
      const tableName = `${prefix}${ent.name}`.toUpperCase();
      const colDefs: string[] = [];

      if (ent.isAspectCuid) {
        colDefs.push('  ID NVARCHAR(36) NOT NULL PRIMARY KEY');
      }

      ent.fields.forEach((f) => {
        if (f.isComposition && f.cardinality === 'many') {
          return;
        }

        if (f.isAssociation) {
          const colName = `${f.name}_ID`.toUpperCase();
          colDefs.push(`  ${colName} NVARCHAR(36)`);
          return;
        }

        let sqlType = 'NVARCHAR(255)';
        const cleanType = f.type.toLowerCase();
        if (cleanType.startsWith('string')) {
          const sizeMatch = f.type.match(/\((\d+)\)/);
          const size = sizeMatch ? sizeMatch[1] : '255';
          sqlType = `NVARCHAR(${size})`;
        } else if (cleanType === 'uuid') {
          sqlType = 'NVARCHAR(36)';
        } else if (cleanType.startsWith('integer') || cleanType === 'int32') {
          sqlType = 'INTEGER';
        } else if (cleanType.startsWith('decimal')) {
          sqlType = f.type.toUpperCase();
        } else if (cleanType === 'boolean') {
          sqlType = 'BOOLEAN';
        } else if (cleanType === 'date') {
          sqlType = 'DATE';
        } else if (cleanType === 'timestamp' || cleanType === 'datetime') {
          sqlType = 'TIMESTAMP';
        }

        const isPrimaryKey = f.isKey && !ent.isAspectCuid;
        const nullability = isPrimaryKey ? 'NOT NULL PRIMARY KEY' : '';
        colDefs.push(`  ${f.name.toUpperCase()} ${sqlType}${nullability ? ' ' + nullability : ''}`);
      });

      if (ent.isAspectManaged) {
        colDefs.push('  CREATEDAT TIMESTAMP');
        colDefs.push('  CREATEDBY NVARCHAR(255)');
        colDefs.push('  MODIFIEDAT TIMESTAMP');
        colDefs.push('  MODIFIEDBY NVARCHAR(255)');
      }

      return `-- Table for entity ${ent.name}\nCREATE TABLE ${tableName} (\n${colDefs.join(',\n')}\n);`;
    })
    .join('\n\n');
}

function generateEdmxPreview(namespace: string | undefined, entities: CdsEntityDef[]): string {
  if (entities.length === 0) return '<!-- No OData metadata compiled yet -->';

  const schemaNs = namespace || 'CatalogService';

  const entityTypesXml = entities
    .map((ent) => {
      const keys: string[] = [];
      const props: string[] = [];
      const navProps: string[] = [];

      if (ent.isAspectCuid) {
        keys.push('ID');
        props.push('        <Property Name="ID" Type="Edm.Guid" Nullable="false" />');
      }

      ent.fields.forEach((f) => {
        if (f.isKey && !ent.isAspectCuid) {
          keys.push(f.name);
        }

        if (f.isAssociation || f.isComposition) {
          const target = f.target || 'Entity';
          const typeAttr = f.cardinality === 'many' ? `Collection(${schemaNs}.${target})` : `${schemaNs}.${target}`;
          navProps.push(`        <NavigationProperty Name="${f.name}" Type="${typeAttr}" />`);
        } else {
          let edmType = 'Edm.String';
          const cleanType = f.type.toLowerCase();
          if (cleanType === 'uuid') edmType = 'Edm.Guid';
          else if (cleanType.startsWith('integer')) edmType = 'Edm.Int32';
          else if (cleanType.startsWith('decimal')) edmType = 'Edm.Decimal';
          else if (cleanType === 'boolean') edmType = 'Edm.Boolean';
          else if (cleanType === 'date') edmType = 'Edm.Date';
          else if (cleanType === 'timestamp' || cleanType === 'datetime') edmType = 'Edm.DateTimeOffset';

          const nullAttr = f.isKey ? ' Nullable="false"' : '';
          props.push(`        <Property Name="${f.name}" Type="${edmType}"${nullAttr} />`);
        }
      });

      if (ent.isAspectManaged) {
        props.push('        <Property Name="createdAt" Type="Edm.DateTimeOffset" />');
        props.push('        <Property Name="createdBy" Type="Edm.String" MaxLength="255" />');
        props.push('        <Property Name="modifiedAt" Type="Edm.DateTimeOffset" />');
        props.push('        <Property Name="modifiedBy" Type="Edm.String" MaxLength="255" />');
      }

      const keyBlock =
        keys.length > 0
          ? `      <Key>\n${keys.map((k) => `        <PropertyRef Name="${k}" />`).join('\n')}\n      </Key>\n`
          : '';

      return `    <EntityType Name="${ent.name}">\n${keyBlock}${props.join('\n')}\n${navProps.join('\n')}\n    </EntityType>`;
    })
    .join('\n\n');

  return `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="${schemaNs}" xmlns="http://docs.oasis-open.org/odata/ns/edm">
${entityTypesXml}
      <EntityContainer Name="EntityContainer">
${entities.map((e) => `        <EntitySet Name="${e.name}" EntityType="${schemaNs}.${e.name}" />`).join('\n')}
      </EntityContainer>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;
}
