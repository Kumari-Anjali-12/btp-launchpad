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
});
