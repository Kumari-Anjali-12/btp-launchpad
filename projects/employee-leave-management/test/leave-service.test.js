const path = require('path');
const cds = require('@sap/cds');
const { expect } = require('chai');

describe('Leave Service Suite', () => {
    const project = path.resolve(__dirname, '..');
    const { GET, POST } = cds.test(project);

    it('should read LeaveTypes metadata and seed records', async () => {
        const res = await GET('/odata/v4/leave/LeaveTypes', {
            auth: { username: 'alice', password: '' }
        });
        expect(res.status).to.equal(200);
        expect(res.data.value).to.be.an('array');
        expect(res.data.value.length).to.be.greaterThan(0);
        const annual = res.data.value.find(t => t.code === 'ANNUAL');
        expect(annual).to.exist;
        expect(annual.name).to.equal('Annual Leave');
    });

    it('should read LeaveBalances for employee', async () => {
        const res = await GET('/odata/v4/leave/LeaveBalances', {
            auth: { username: 'alice', password: '' }
        });
        expect(res.status).to.equal(200);
        expect(res.data.value).to.be.an('array');
    });

    it('should reject a leave request with invalid date chronology (start > end)', async () => {
        try {
            await POST('/odata/v4/leave/LeaveRequests', {
                employee_ID: '11111111-1111-1111-1111-111111111111',
                leaveType_code: 'ANNUAL',
                startDate: '2026-10-15',
                endDate: '2026-10-10',
                totalDays: 2.0,
                reason: 'Invalid chronology'
            }, {
                auth: { username: 'alice', password: '' }
            });
            expect.fail('Should have rejected with 400 error');
        } catch (err) {
            if (err.name === 'AssertionError') throw err;
            expect(err.response?.status || err.statusCode || 400).to.equal(400);
        }
    });

    it('should reject a leave request that overlaps with an existing approved/pending request', async () => {
        try {
            // Seed data has Alice request 1002 from 2026-06-15 to 2026-06-19 (Pending)
            await POST('/odata/v4/leave/LeaveRequests', {
                employee_ID: '11111111-1111-1111-1111-111111111111',
                leaveType_code: 'ANNUAL',
                startDate: '2026-06-16',
                endDate: '2026-06-18',
                totalDays: 3.0,
                reason: 'Overlapping request test'
            }, {
                auth: { username: 'alice', password: '' }
            });
            expect.fail('Should have rejected with 409 conflict');
        } catch (err) {
            if (err.name === 'AssertionError') throw err;
            expect(err.response?.status || err.statusCode || 409).to.equal(409);
        }
    });

    it('should reject request exceeding available leave balance', async () => {
        try {
            await POST('/odata/v4/leave/LeaveRequests', {
                employee_ID: '11111111-1111-1111-1111-111111111111',
                leaveType_code: 'SICK',
                startDate: '2026-11-01',
                endDate: '2026-11-25',
                totalDays: 25.0, // Sick entitlement is 10
                reason: 'Exceeding balance test'
            }, {
                auth: { username: 'alice', password: '' }
            });
            expect.fail('Should have rejected with 400 insufficient balance');
        } catch (err) {
            if (err.name === 'AssertionError') throw err;
            expect(err.response?.status || err.statusCode || 400).to.equal(400);
        }
    });

    it('should create a valid draft request and submit it', async () => {
        // Create draft
        const createRes = await POST('/odata/v4/leave/LeaveRequests', {
            employee_ID: '11111111-1111-1111-1111-111111111111',
            leaveType_code: 'ANNUAL',
            startDate: '2026-09-01',
            endDate: '2026-09-03',
            totalDays: 3.0,
            status: 'Draft',
            reason: 'Autumn weekend trip'
        }, {
            auth: { username: 'alice', password: '' }
        });

        expect(createRes.status).to.equal(201);
        const reqId = createRes.data.ID;
        expect(reqId).to.exist;
        expect(createRes.data.status).to.equal('Draft');

        // Submit action
        const submitRes = await POST(`/odata/v4/leave/LeaveRequests(${reqId})/submitRequest`, {}, {
            auth: { username: 'alice', password: '' }
        });
        expect(submitRes.status).to.be.oneOf([200, 204]);
    });
});
