const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
    const { Employees, LeaveTypes, LeaveBalances } = this.entities;

    // Action: runAnnualAccrual
    this.on('runAnnualAccrual', async (req) => {
        const { year } = req.data;
        if (!year || year < 2020 || year > 2100) {
            return req.error(400, 'Please specify a valid 4-digit year for annual accrual.');
        }

        return await cds.tx(req).run(async (tx) => {
            const employees = await tx.read(Employees);
            const leaveTypes = await tx.read(LeaveTypes);
            let createdCount = 0;

            for (const emp of employees) {
                for (const lt of leaveTypes) {
                    const existing = await tx.read(LeaveBalances).where({
                        employee_ID: emp.ID,
                        leaveType_code: lt.code,
                        year: year
                    });

                    if (!existing || existing.length === 0) {
                        const entitlement = Number(lt.maxDaysPerYear || 20);
                        await tx.create(LeaveBalances).entries({
                            employee_ID: emp.ID,
                            leaveType_code: lt.code,
                            year: year,
                            totalEntitlement: entitlement,
                            usedDays: 0,
                            pendingDays: 0,
                            availableDays: entitlement
                        });
                        createdCount++;
                    }
                }
            }

            return `Annual accrual completed for year ${year}: created ${createdCount} new balance allocations across ${employees.length} employees.`;
        });
    });
});
