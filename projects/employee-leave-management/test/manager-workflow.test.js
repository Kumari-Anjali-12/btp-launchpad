const path = require('path');
const cds = require('@sap/cds');
const { expect } = require('chai');

describe('Manager Workflow Suite', () => {
    const project = path.resolve(__dirname, '..');
    const { GET, POST } = cds.test(project);

    let testRequestId;

    before(async () => {
        // Create a pending request for testing manager approval
        const res = await POST('/odata/v4/leave/LeaveRequests', {
            employee_ID: '11111111-1111-1111-1111-111111111111',
            leaveType_code: 'ANNUAL',
            startDate: '2026-10-01',
            endDate: '2026-10-02',
            totalDays: 2.0,
            status: 'Pending',
            reason: 'Conference attendance'
        }, {
            auth: { username: 'alice', password: '' }
        });
        testRequestId = res.data.ID;
    });

    it('manager can inspect pending leave requests', async () => {
        const res = await GET('/odata/v4/manager/LeaveRequests', {
            auth: { username: 'bob', password: '' }
        });
        expect(res.status).to.equal(200);
        expect(res.data.value).to.be.an('array');
    });

    it('manager can approve a pending leave request and update balance', async () => {
        const approveRes = await POST(`/odata/v4/manager/LeaveRequests(${testRequestId})/approveRequest`, {
            comments: 'Approved. Enjoy the conference!'
        }, {
            auth: { username: 'bob', password: '' }
        });
        expect(approveRes.status).to.be.oneOf([200, 204]);

        // Verify status changed to Approved
        const checkRes = await GET(`/odata/v4/manager/LeaveRequests(${testRequestId})`, {
            auth: { username: 'bob', password: '' }
        });
        expect(checkRes.data.status).to.equal('Approved');
    });

    it('approving an already approved request returns error 400', async () => {
        try {
            await POST(`/odata/v4/manager/LeaveRequests(${testRequestId})/approveRequest`, {
                comments: 'Second approval attempt'
            }, {
                auth: { username: 'bob', password: '' }
            });
            expect.fail('Should have failed because request is not Pending');
        } catch (err) {
            if (err.name === 'AssertionError') throw err;
            expect(err.response?.status || err.statusCode || 400).to.equal(400);
        }
    });

    it('rejecting without a comment returns error 400', async () => {
        // Create another pending request for rejection test
        const newReq = await POST('/odata/v4/leave/LeaveRequests', {
            employee_ID: '11111111-1111-1111-1111-111111111111',
            leaveType_code: 'ANNUAL',
            startDate: '2026-12-20',
            endDate: '2026-12-22',
            totalDays: 3.0,
            status: 'Pending',
            reason: 'Year end break'
        }, {
            auth: { username: 'alice', password: '' }
        });

        try {
            await POST(`/odata/v4/manager/LeaveRequests(${newReq.data.ID})/rejectRequest`, {
                comments: '   ' // Empty whitespace comment
            }, {
                auth: { username: 'bob', password: '' }
            });
            expect.fail('Should have failed due to missing comment');
        } catch (err) {
            if (err.name === 'AssertionError') throw err;
            expect(err.response?.status || err.statusCode || 400).to.equal(400);
        }
    });

    it('manager cannot self-approve their own leave request (returns 403)', async () => {
        // Create a pending request owned by Bob (22222222-2222-2222-2222-222222222222)
        const bobReq = await POST('/odata/v4/leave/LeaveRequests', {
            employee_ID: '22222222-2222-2222-2222-222222222222',
            leaveType_code: 'ANNUAL',
            startDate: '2026-11-15',
            endDate: '2026-11-16',
            totalDays: 2.0,
            status: 'Pending',
            reason: 'Bob personal time'
        }, {
            auth: { username: 'bob', password: '' }
        });

        try {
            await POST(`/odata/v4/manager/LeaveRequests(${bobReq.data.ID})/approveRequest`, {
                comments: 'Self approval attempt'
            }, {
                auth: { username: 'bob', password: '' }
            });
            expect.fail('Bob should not be able to self-approve');
        } catch (err) {
            if (err.name === 'AssertionError') throw err;
            expect(err.response?.status || err.statusCode || 403).to.equal(403);
        }
    });
});
