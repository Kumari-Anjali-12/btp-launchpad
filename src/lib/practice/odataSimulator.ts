import { ODataRequest, ODataResponse } from '../../types/practice';

interface Employee {
  ID: string;
  name: string;
  email: string;
  department: string;
  role: string;
  salary: number;
  hireDate: string;
  isActive: boolean;
}

interface LeaveRequest {
  ID: string;
  employee_ID: string;
  startDate: string;
  endDate: string;
  leaveType: string;
  days: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  comments: string;
  employee?: Employee;
}

interface Vendor {
  ID: string;
  companyName: string;
  taxId: string;
  country: string;
  status: 'Active' | 'Under Review' | 'Blocked';
  rating: number;
}

interface PurchaseOrder {
  ID: string;
  poNumber: string;
  vendor_ID: string;
  orderDate: string;
  totalAmount: number;
  currency: 'EUR' | 'USD';
  status: 'Draft' | 'Confirmed' | 'Delivered';
  vendor?: Vendor;
}

interface DatabaseState {
  Employees: Employee[];
  LeaveRequests: LeaveRequest[];
  Vendors: Vendor[];
  PurchaseOrders: PurchaseOrder[];
}

const INITIAL_DB: DatabaseState = {
  Employees: [
    {
      ID: 'e101',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@enterprise.corp',
      department: 'Cloud Engineering',
      role: 'Developer',
      salary: 82000,
      hireDate: '2023-01-15',
      isActive: true,
    },
    {
      ID: 'e102',
      name: 'Maria Chen',
      email: 'maria.chen@enterprise.corp',
      department: 'Enterprise Arch',
      role: 'Lead Architect',
      salary: 115000,
      hireDate: '2021-04-10',
      isActive: true,
    },
    {
      ID: 'e103',
      name: 'Lucas Müller',
      email: 'lucas.muller@enterprise.corp',
      department: 'Cloud Engineering',
      role: 'Developer',
      salary: 78000,
      hireDate: '2023-09-01',
      isActive: true,
    },
    {
      ID: 'e104',
      name: 'Elena Rostova',
      email: 'elena.rostova@enterprise.corp',
      department: 'Security Operations',
      role: 'Security Officer',
      salary: 95000,
      hireDate: '2022-03-20',
      isActive: true,
    },
    {
      ID: 'e105',
      name: 'Tariq Mansoor',
      email: 'tariq.mansoor@enterprise.corp',
      department: 'Finance Solutions',
      role: 'Functional Consultant',
      salary: 88000,
      hireDate: '2022-11-05',
      isActive: false,
    },
  ],
  LeaveRequests: [
    {
      ID: 'lr-501',
      employee_ID: 'e101',
      startDate: '2026-12-20',
      endDate: '2026-12-28',
      leaveType: 'Vacation',
      days: 5,
      status: 'Approved',
      comments: 'Year-end family holidays',
    },
    {
      ID: 'lr-502',
      employee_ID: 'e103',
      startDate: '2026-12-01',
      endDate: '2026-12-03',
      leaveType: 'Sick',
      days: 2,
      status: 'Pending',
      comments: 'Doctor appointment recovery',
    },
    {
      ID: 'lr-503',
      employee_ID: 'e102',
      startDate: '2027-01-10',
      endDate: '2027-01-15',
      leaveType: 'Vacation',
      days: 4,
      status: 'Pending',
      comments: 'Tech conference recharge',
    },
    {
      ID: 'lr-504',
      employee_ID: 'e104',
      startDate: '2026-11-10',
      endDate: '2026-11-11',
      leaveType: 'Personal',
      days: 1,
      status: 'Rejected',
      comments: 'Conflict with critical sprint release',
    },
  ],
  Vendors: [
    {
      ID: 'v-801',
      companyName: 'Acme Cloud Logistics',
      taxId: 'DE123456789',
      country: 'Germany',
      status: 'Active',
      rating: 4.8,
    },
    {
      ID: 'v-802',
      companyName: 'Global Tech Silicones',
      taxId: 'US987654321',
      country: 'United States',
      status: 'Under Review',
      rating: 3.9,
    },
    {
      ID: 'v-803',
      companyName: 'Nippon Sensor Components',
      taxId: 'JP456789123',
      country: 'Japan',
      status: 'Active',
      rating: 4.9,
    },
    {
      ID: 'v-804',
      companyName: 'Nordic Data Cables AB',
      taxId: 'SE321654987',
      country: 'Sweden',
      status: 'Blocked',
      rating: 2.1,
    },
  ],
  PurchaseOrders: [
    {
      ID: 'po-9001',
      poNumber: 'PO-2026-001',
      vendor_ID: 'v-801',
      orderDate: '2026-10-15',
      totalAmount: 14500.0,
      currency: 'EUR',
      status: 'Confirmed',
    },
    {
      ID: 'po-9002',
      poNumber: 'PO-2026-002',
      vendor_ID: 'v-803',
      orderDate: '2026-11-01',
      totalAmount: 48200.0,
      currency: 'EUR',
      status: 'Delivered',
    },
    {
      ID: 'po-9003',
      poNumber: 'PO-2026-003',
      vendor_ID: 'v-802',
      orderDate: '2026-11-18',
      totalAmount: 8900.5,
      currency: 'USD',
      status: 'Draft',
    },
  ],
};

// In-memory working copy
let liveDb: DatabaseState = JSON.parse(JSON.stringify(INITIAL_DB));

/**
 * Resets simulated in-memory OData database to initial state.
 */
export function resetODataDatabase(): void {
  liveDb = JSON.parse(JSON.stringify(INITIAL_DB));
}

/**
 * Executes a simulated OData v4 request against the in-memory enterprise database.
 */
export function executeODataRequest(req: ODataRequest): ODataResponse {
  const startTime = performance.now();

  const headers: Record<string, string> = {
    'content-type': 'application/json;odata.metadata=minimal',
    'odata-version': '4.0',
    'x-btp-simulation': 'true',
  };

  // Auth Simulation Checks
  if (req.queryParams?.['simulateAuth'] === '401' || req.headers?.['x-simulate-auth'] === '401') {
    return {
      status: 401,
      statusText: 'Unauthorized',
      headers,
      data: {
        error: {
          code: '401',
          message: 'Authentication failed. Missing or expired OAuth 2.0 Bearer token. Ensure XSUAA token is present.',
          target: req.path,
        },
      },
      executionTimeMs: Math.round(performance.now() - startTime),
    };
  }

  if (req.queryParams?.['simulateAuth'] === '403' || req.headers?.['x-simulate-auth'] === '403') {
    return {
      status: 403,
      statusText: 'Forbidden',
      headers,
      data: {
        error: {
          code: '403',
          message: 'Access denied. The caller token lacks the required scope (e.g. LeaveRequest.Admin or Vendor.Manager).',
          target: req.path,
        },
      },
      executionTimeMs: Math.round(performance.now() - startTime),
    };
  }

  if (req.queryParams?.['simulateAuth'] === '500') {
    return {
      status: 500,
      statusText: 'Internal Server Error',
      headers,
      data: {
        error: {
          code: '500',
          message: 'An unexpected exception occurred while executing CAP service handler or HANA connection pool.',
        },
      },
      executionTimeMs: Math.round(performance.now() - startTime),
    };
  }

  // Parse path
  let path = req.path.trim();
  if (path.startsWith('/')) path = path.slice(1);
  const segments = path.split('/').filter(Boolean);

  let entityTarget = segments[segments.length - 1] || '';
  if (segments.length >= 2 && segments[0] === 'odata') {
    entityTarget = segments.slice(3).join('/');
  }

  const keyMatch = entityTarget.match(/^([A-Za-z0-9_]+)\((?:ID=)?['"]?([A-Za-z0-9_-]+)['"]?\)$/);
  const isKeyLookup = Boolean(keyMatch);
  const entitySetName = (isKeyLookup && keyMatch && keyMatch[1] ? keyMatch[1] : entityTarget) as keyof DatabaseState;
  const entityKey = isKeyLookup && keyMatch && keyMatch[2] ? keyMatch[2] : null;

  if (!liveDb[entitySetName]) {
    return {
      status: 404,
      statusText: 'Not Found',
      headers,
      data: {
        error: {
          code: '404',
          message: `EntitySet or resource '${entityTarget}' does not exist in service '/odata/v4/catalog'. Available entity sets: Employees, LeaveRequests, Vendors, PurchaseOrders.`,
        },
      },
      executionTimeMs: Math.round(performance.now() - startTime),
    };
  }

  const dataset = (liveDb[entitySetName] as unknown) as Array<Record<string, unknown>>;

  switch (req.method) {
    case 'GET': {
      if (isKeyLookup && entityKey) {
        const item = dataset.find((x) => String(x.ID) === entityKey);
        if (!item) {
          return {
            status: 404,
            statusText: 'Not Found',
            headers,
            data: {
              error: {
                code: '404',
                message: `Entity with key '${entityKey}' was not found in '${entitySetName}'.`,
              },
            },
            executionTimeMs: Math.round(performance.now() - startTime),
          };
        }

        let resultItem = { ...item };
        if (req.queryParams?.$expand) {
          resultItem = applyExpand(entitySetName, resultItem, req.queryParams.$expand);
        }

        if (req.queryParams?.$select) {
          resultItem = applySelect(resultItem, req.queryParams.$select);
        }

        return {
          status: 200,
          statusText: 'OK',
          headers,
          data: {
            '@odata.context': `$metadata#${entitySetName}/$entity`,
            ...resultItem,
          },
          executionTimeMs: Math.round(performance.now() - startTime),
        };
      }

      let result = dataset.map((d) => ({ ...d }));

      if (req.queryParams?.$filter) {
        try {
          result = applyFilter(result, req.queryParams.$filter);
        } catch {
          return {
            status: 400,
            statusText: 'Bad Request',
            headers,
            data: {
              error: {
                code: '400',
                message: `Malformed $filter expression: '${req.queryParams.$filter}'. Examples: "status eq 'Pending'", "salary gt 80000", "isActive eq true".`,
              },
            },
            executionTimeMs: Math.round(performance.now() - startTime),
          };
        }
      }

      if (req.queryParams?.$expand) {
        const expandProp = req.queryParams.$expand;
        result = result.map((item) => applyExpand(entitySetName, item, expandProp));
      }

      if (req.queryParams?.$orderby) {
        result = applyOrderBy(result, req.queryParams.$orderby);
      }

      const totalCount = result.length;

      if (req.queryParams?.$skip) {
        const skip = parseInt(req.queryParams.$skip, 10);
        if (!isNaN(skip) && skip > 0) {
          result = result.slice(skip);
        }
      }

      if (req.queryParams?.$top) {
        const top = parseInt(req.queryParams.$top, 10);
        if (!isNaN(top) && top >= 0) {
          result = result.slice(0, top);
        }
      }

      if (req.queryParams?.$select) {
        const selectFields = req.queryParams.$select;
        result = result.map((item) => applySelect(item, selectFields));
      }

      const responseBody: Record<string, unknown> = {
        '@odata.context': `$metadata#${entitySetName}`,
      };

      if (req.queryParams?.$count === 'true') {
        responseBody['@odata.count'] = totalCount;
      }

      responseBody['value'] = result;

      return {
        status: 200,
        statusText: 'OK',
        headers,
        data: responseBody,
        executionTimeMs: Math.round(performance.now() - startTime),
      };
    }

    case 'POST': {
      let bodyObj: Record<string, unknown>;
      try {
        if (!req.body || req.body.trim().length === 0) {
          throw new Error('Empty payload');
        }
        bodyObj = JSON.parse(req.body) as Record<string, unknown>;
      } catch {
        return {
          status: 400,
          statusText: 'Bad Request',
          headers,
          data: {
            error: {
              code: '400',
              message: 'Invalid JSON payload in POST request body.',
            },
          },
          executionTimeMs: Math.round(performance.now() - startTime),
        };
      }

      const newId = bodyObj.ID ? String(bodyObj.ID) : `gen-${Date.now().toString(36)}`;
      const newEntity = {
        ...bodyObj,
        ID: newId,
      };

      dataset.push(newEntity);

      return {
        status: 201,
        statusText: 'Created',
        headers: {
          ...headers,
          location: `/odata/v4/catalog/${entitySetName}('${newId}')`,
        },
        data: {
          '@odata.context': `$metadata#${entitySetName}/$entity`,
          ...newEntity,
        },
        executionTimeMs: Math.round(performance.now() - startTime),
      };
    }

    case 'PATCH': {
      if (!entityKey) {
        return {
          status: 400,
          statusText: 'Bad Request',
          headers,
          data: {
            error: {
              code: '400',
              message: `PATCH requires a specific entity key in the URL. Example: /odata/v4/catalog/${entitySetName}('key123')`,
            },
          },
          executionTimeMs: Math.round(performance.now() - startTime),
        };
      }

      const itemIdx = dataset.findIndex((x) => String(x.ID) === entityKey);
      if (itemIdx === -1) {
        return {
          status: 404,
          statusText: 'Not Found',
          headers,
          data: {
            error: {
              code: '404',
              message: `Cannot update entity '${entityKey}': entity not found.`,
            },
          },
          executionTimeMs: Math.round(performance.now() - startTime),
        };
      }

      let patchObj: Record<string, unknown>;
      try {
        if (!req.body || req.body.trim().length === 0) {
          throw new Error('Empty payload');
        }
        patchObj = JSON.parse(req.body) as Record<string, unknown>;
      } catch {
        return {
          status: 400,
          statusText: 'Bad Request',
          headers,
          data: {
            error: {
              code: '400',
              message: 'Invalid JSON payload in PATCH request body.',
            },
          },
          executionTimeMs: Math.round(performance.now() - startTime),
        };
      }

      const updated = {
        ...dataset[itemIdx],
        ...patchObj,
        ID: entityKey,
      };
      dataset[itemIdx] = updated;

      return {
        status: 200,
        statusText: 'OK',
        headers,
        data: {
          '@odata.context': `$metadata#${entitySetName}/$entity`,
          ...updated,
        },
        executionTimeMs: Math.round(performance.now() - startTime),
      };
    }

    case 'DELETE': {
      if (!entityKey) {
        return {
          status: 400,
          statusText: 'Bad Request',
          headers,
          data: {
            error: {
              code: '400',
              message: `DELETE requires a specific entity key in the URL. Example: /odata/v4/catalog/${entitySetName}('key123')`,
            },
          },
          executionTimeMs: Math.round(performance.now() - startTime),
        };
      }

      const delIdx = dataset.findIndex((x) => String(x.ID) === entityKey);
      if (delIdx === -1) {
        return {
          status: 404,
          statusText: 'Not Found',
          headers,
          data: {
            error: {
              code: '404',
              message: `Cannot delete entity '${entityKey}': entity not found.`,
            },
          },
          executionTimeMs: Math.round(performance.now() - startTime),
        };
      }

      dataset.splice(delIdx, 1);

      return {
        status: 204,
        statusText: 'No Content',
        headers,
        data: null,
        executionTimeMs: Math.round(performance.now() - startTime),
      };
    }

    default:
      return {
        status: 405,
        statusText: 'Method Not Allowed',
        headers,
        data: {
          error: {
            code: '405',
            message: `HTTP method '${req.method}' not supported on this endpoint.`,
          },
        },
        executionTimeMs: Math.round(performance.now() - startTime),
      };
  }
}

function applyFilter(records: Array<Record<string, unknown>>, filterExpr: string): Array<Record<string, unknown>> {
  const parts = filterExpr.split(/\s+and\s+/i);

  return records.filter((rec) => {
    return parts.every((part) => {
      const match = part.trim().match(/^([A-Za-z0-9_]+)\s+(eq|ne|gt|ge|lt|le|contains)\s+(.+)$/i);
      if (!match || !match[1] || !match[2] || !match[3]) return true;

      const field = match[1];
      const op = match[2];
      const rawVal = match[3];
      const cleanVal = rawVal.replace(/^['"]|['"]$/g, '');
      const recVal = rec[field];

      if (recVal === undefined) return false;

      const operator = op.toLowerCase();
      if (operator === 'eq') {
        if (typeof recVal === 'boolean') {
          return recVal === (cleanVal.toLowerCase() === 'true');
        }
        if (typeof recVal === 'number') {
          return recVal === Number(cleanVal);
        }
        return String(recVal).toLowerCase() === cleanVal.toLowerCase();
      }
      if (operator === 'ne') {
        return String(recVal).toLowerCase() !== cleanVal.toLowerCase();
      }
      if (operator === 'gt') {
        return Number(recVal) > Number(cleanVal);
      }
      if (operator === 'ge') {
        return Number(recVal) >= Number(cleanVal);
      }
      if (operator === 'lt') {
        return Number(recVal) < Number(cleanVal);
      }
      if (operator === 'le') {
        return Number(recVal) <= Number(cleanVal);
      }
      if (operator === 'contains') {
        return String(recVal).toLowerCase().includes(cleanVal.toLowerCase());
      }
      return true;
    });
  });
}

function applyExpand(
  entitySet: string,
  item: Record<string, unknown>,
  expandProperty: string
): Record<string, unknown> {
  const copy = { ...item };
  const target = expandProperty.trim();

  if (entitySet === 'LeaveRequests' && target === 'employee') {
    const empId = copy['employee_ID'];
    const emp = liveDb.Employees.find((e) => e.ID === empId);
    copy['employee'] = emp ? { ...emp } : null;
  }

  if (entitySet === 'PurchaseOrders' && target === 'vendor') {
    const vId = copy['vendor_ID'];
    const v = liveDb.Vendors.find((ven) => ven.ID === vId);
    copy['vendor'] = v ? { ...v } : null;
  }

  return copy;
}

function applySelect(item: Record<string, unknown>, selectStr: string): Record<string, unknown> {
  const fields = selectStr.split(',').map((f) => f.trim());
  const selected: Record<string, unknown> = {};

  fields.forEach((field) => {
    if (item[field] !== undefined) {
      selected[field] = item[field];
    }
  });

  if (item['ID'] !== undefined) {
    selected['ID'] = item['ID'];
  }

  return selected;
}

function applyOrderBy(records: Array<Record<string, unknown>>, orderbyStr: string): Array<Record<string, unknown>> {
  const parts = orderbyStr.split(',').map((p) => p.trim());
  const sorted = [...records];

  sorted.sort((a, b) => {
    for (const part of parts) {
      const match = part.trim().match(/^([A-Za-z0-9_]+)(?:\s+(asc|desc))?$/i);
      if (!match || !match[1]) continue;

      const field = match[1];
      const isDesc = match[2]?.toLowerCase() === 'desc';

      const valA = a[field];
      const valB = b[field];

      if (valA === undefined || valB === undefined || valA === null || valB === null) continue;

      if (valA < valB) return isDesc ? 1 : -1;
      if (valA > valB) return isDesc ? -1 : 1;
    }
    return 0;
  });

  return sorted;
}
