const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
    const { LeaveRequests, LeaveBalances, ApprovalLogs } = this.entities;

    // Helper to calculate business/calendar days if needed
    const getDaysDifference = (startStr, endStr) => {
        const start = new Date(startStr);
        const end = new Date(endStr);
        const diffTime = end.getTime() - start.getTime();
        return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    };

    // Validation function
    const validateRequest = async (req) => {
        const data = req.data;

        // 1. Validate Date Chronology
        if (data.startDate && data.endDate) {
            if (new Date(data.startDate) > new Date(data.endDate)) {
                return req.error(400, 'Start date cannot be after end date.', 'in/startDate');
            }
        }

        // Calculate totalDays if not provided
        if (!data.totalDays && data.startDate && data.endDate) {
            data.totalDays = data.isHalfDay ? 0.5 : getDaysDifference(data.startDate, data.endDate);
        }

        // 2. Overlap Check for active requests
        if (data.employee_ID && data.startDate && data.endDate) {
            const existingOverlaps = await SELECT.from(LeaveRequests).where({
                employee_ID: data.employee_ID,
                status: { in: ['Pending', 'Approved'] }
            });

            const hasOverlap = existingOverlaps.some(reqItem => {
                // If draft or same ID, ignore
                if (reqItem.ID === data.ID) return false;
                return (data.startDate <= reqItem.endDate && data.endDate >= reqItem.startDate);
            });

            if (hasOverlap) {
                return req.error(409, 'A leave request already exists covering this date range.', 'in/startDate');
            }
        }

        // 3. Balance Sufficiency Check
        if (data.employee_ID && data.leaveType_code && data.startDate) {
            const reqYear = new Date(data.startDate).getFullYear();
            const balance = await SELECT.one.from(LeaveBalances).where({
                employee_ID: data.employee_ID,
                leaveType_code: data.leaveType_code,
                year: reqYear
            });

            if (!balance) {
                return req.error(404, `No leave balance allocated for year ${reqYear}.`);
            }

            const currentAvailable = Number(balance.totalEntitlement) - (Number(balance.usedDays) + Number(balance.pendingDays));
            if (Number(data.totalDays) > currentAvailable) {
                return req.error(400, `Insufficient leave balance. Requested: ${data.totalDays}, Available: ${currentAvailable}.`);
            }
        }

        // Default initial status
        if (!data.status) {
            data.status = 'Draft';
        }

        // Auto-increment requestNumber if missing
        if (!data.requestNumber) {
            const maxReq = await SELECT.one.from(LeaveRequests).columns('max(requestNumber) as maxNum');
            data.requestNumber = (maxReq?.maxNum || 1000) + 1;
        }
    };

    // Attach validation to both active entities and drafts
    this.before(['CREATE', 'NEW'], 'LeaveRequests', validateRequest);
    this.before(['CREATE', 'NEW'], 'LeaveRequests.drafts', validateRequest);

    // Custom Action: submitRequest
    this.on('submitRequest', 'LeaveRequests', async (req) => {
        const id = req.params[0]?.ID || req.params[0];
        
        return await cds.tx(req).run(async (tx) => {
            const requestRes = await tx.read(LeaveRequests).where({ ID: id });
            const request = Array.isArray(requestRes) ? requestRes[0] : requestRes;
            if (!request) return req.error(404, 'Leave request not found.');
            if (request.status !== 'Draft') {
                return req.error(400, `Only Draft requests can be submitted. Current status: ${request.status}`);
            }

            // Update status to Pending
            await tx.update(LeaveRequests).set({ status: 'Pending' }).where({ ID: id });

            // Increment pendingDays on balance
            const reqYear = new Date(request.startDate).getFullYear();
            const balanceRes = await tx.read(LeaveBalances).where({
                employee_ID: request.employee_ID,
                leaveType_code: request.leaveType_code,
                year: reqYear
            });
            const balance = Array.isArray(balanceRes) ? balanceRes[0] : balanceRes;

            if (balance) {
                const newPending = Number(balance.pendingDays) + Number(request.totalDays);
                const newAvailable = Number(balance.totalEntitlement) - (Number(balance.usedDays) + newPending);
                await tx.update(LeaveBalances).set({
                    pendingDays: newPending,
                    availableDays: newAvailable
                }).where({ ID: balance.ID });
            }

            // Write immutable audit log
            await tx.create(ApprovalLogs).entries({
                leaveRequest_ID: id,
                approver_ID: request.employee_ID,
                action: 'SUBMITTED',
                actionDate: new Date().toISOString(),
                comments: 'Request submitted for manager approval.'
            });

            const updatedRes = await tx.read(LeaveRequests).where({ ID: id });
            return Array.isArray(updatedRes) ? updatedRes[0] : updatedRes;
        });
    });

    // Custom Action: cancelRequest
    this.on('cancelRequest', 'LeaveRequests', async (req) => {
        const id = req.params[0]?.ID || req.params[0];
        const { reason } = req.data || {};

        return await cds.tx(req).run(async (tx) => {
            const requestRes = await tx.read(LeaveRequests).where({ ID: id });
            const request = Array.isArray(requestRes) ? requestRes[0] : requestRes;
            if (!request) return req.error(404, 'Leave request not found.');
            if (request.status === 'Cancelled' || request.status === 'Rejected') {
                return req.error(400, `Cannot cancel a request that is already ${request.status}.`);
            }

            // If it was Pending, release pendingDays
            if (request.status === 'Pending') {
                const reqYear = new Date(request.startDate).getFullYear();
                const balanceRes = await tx.read(LeaveBalances).where({
                    employee_ID: request.employee_ID,
                    leaveType_code: request.leaveType_code,
                    year: reqYear
                });
                const balance = Array.isArray(balanceRes) ? balanceRes[0] : balanceRes;
                if (balance) {
                    const newPending = Math.max(0, Number(balance.pendingDays) - Number(request.totalDays));
                    const newAvailable = Number(balance.totalEntitlement) - (Number(balance.usedDays) + newPending);
                    await tx.update(LeaveBalances).set({
                        pendingDays: newPending,
                        availableDays: newAvailable
                    }).where({ ID: balance.ID });
                }
            }

            // Update status to Cancelled
            await tx.update(LeaveRequests).set({ status: 'Cancelled' }).where({ ID: id });

            // Create audit log
            await tx.create(ApprovalLogs).entries({
                leaveRequest_ID: id,
                approver_ID: request.employee_ID,
                action: 'CANCELLED',
                actionDate: new Date().toISOString(),
                comments: reason || 'Request cancelled by employee.'
            });

            const updatedRes = await tx.read(LeaveRequests).where({ ID: id });
            return Array.isArray(updatedRes) ? updatedRes[0] : updatedRes;
        });
    });
});
