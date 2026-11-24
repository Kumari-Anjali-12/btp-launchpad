const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
    const { LeaveRequests } = this.entities;
    const { LeaveBalances, ApprovalLogs } = cds.entities('sap.btp.leave');

    // Action: approveRequest
    this.on('approveRequest', 'LeaveRequests', async (req) => {
        const id = req.params[0]?.ID || req.params[0];
        const { comments } = req.data || {};

        return await cds.tx(req).run(async (tx) => {
            const requestRes = await tx.read(LeaveRequests).where({ ID: id });
            const request = Array.isArray(requestRes) ? requestRes[0] : requestRes;
            if (!request) return req.error(404, 'Leave request not found.');
            if (request.status !== 'Pending') {
                return req.error(400, `Only Pending requests can be approved. Current status: ${request.status}`);
            }

            // 1. Update status to Approved
            await tx.update(LeaveRequests).set({ status: 'Approved' }).where({ ID: id });

            // 2. Transactionally update LeaveBalances: shift from pendingDays to usedDays
            const reqYear = new Date(request.startDate).getFullYear();
            const balanceRes = await tx.read(LeaveBalances).where({
                employee_ID: request.employee_ID,
                leaveType_code: request.leaveType_code,
                year: reqYear
            });
            const balance = Array.isArray(balanceRes) ? balanceRes[0] : balanceRes;

            if (balance) {
                const newPending = Math.max(0, Number(balance.pendingDays) - Number(request.totalDays));
                const newUsed = Number(balance.usedDays) + Number(request.totalDays);
                const newAvailable = Number(balance.totalEntitlement) - (newUsed + newPending);

                await tx.update(LeaveBalances).set({
                    pendingDays: newPending,
                    usedDays: newUsed,
                    availableDays: newAvailable
                }).where({ ID: balance.ID });
            }

            // 3. Write immutable audit log
            await tx.create(ApprovalLogs).entries({
                leaveRequest_ID: id,
                approver_ID: req.user?.id || 'MANAGER',
                action: 'APPROVED',
                actionDate: new Date().toISOString(),
                comments: comments || 'Approved by Manager.'
            });

            return await tx.read(LeaveRequests).where({ ID: id });
        });
    });

    // Action: rejectRequest
    this.on('rejectRequest', 'LeaveRequests', async (req) => {
        const id = req.params[0]?.ID || req.params[0];
        const { comments } = req.data || {};

        return await cds.tx(req).run(async (tx) => {
            const request = await tx.read(LeaveRequests).where({ ID: id });
            if (!request) return req.error(404, 'Leave request not found.');
            if (request.status !== 'Pending') {
                return req.error(400, `Only Pending requests can be rejected. Current status: ${request.status}`);
            }

            // 1. Update status to Rejected
            await tx.update(LeaveRequests).set({ status: 'Rejected' }).where({ ID: id });

            // 2. Release pendingDays on LeaveBalances
            const reqYear = new Date(request.startDate).getFullYear();
            const balance = await tx.read(LeaveBalances).where({
                employee_ID: request.employee_ID,
                leaveType_code: request.leaveType_code,
                year: reqYear
            });

            if (balance) {
                const newPending = Math.max(0, Number(balance.pendingDays) - Number(request.totalDays));
                const newAvailable = Number(balance.totalEntitlement) - (Number(balance.usedDays) + newPending);

                await tx.update(LeaveBalances).set({
                    pendingDays: newPending,
                    availableDays: newAvailable
                }).where({ ID: balance.ID });
            }

            // 3. Write immutable audit log
            await tx.create(ApprovalLogs).entries({
                leaveRequest_ID: id,
                approver_ID: req.user?.id || 'MANAGER',
                action: 'REJECTED',
                actionDate: new Date().toISOString(),
                comments: comments || 'Rejected by Manager.'
            });

            return await tx.read(LeaveRequests).where({ ID: id });
        });
    });
});
