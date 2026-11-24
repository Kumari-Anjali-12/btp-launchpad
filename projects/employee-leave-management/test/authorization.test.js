const path = require('path');
const cds = require('@sap/cds');
const { expect } = require('chai');

describe('Authorization & Role Enforcement Suite', () => {
    const project = path.resolve(__dirname, '..');
    const { GET } = cds.test(project);

    it('allows employee alice to access LeaveService', async () => {
        const res = await GET('/odata/v4/leave/LeaveTypes', {
            auth: { username: 'alice', password: '' }
        });
        expect(res.status).to.equal(200);
    });

    it('forbids employee alice from accessing AdminService', async () => {
        try {
            await GET('/odata/v4/admin/Employees', {
                auth: { username: 'alice', password: '' }
            });
            expect.fail('Alice should not have access to AdminService');
        } catch (err) {
            expect(err.response?.status || err.statusCode).to.equal(403);
        }
    });

    it('allows admin carol to access AdminService', async () => {
        const res = await GET('/odata/v4/admin/Employees', {
            auth: { username: 'carol', password: '' }
        });
        expect(res.status).to.equal(200);
        expect(res.data.value).to.be.an('array');
    });
});
