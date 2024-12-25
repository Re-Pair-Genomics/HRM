// This model is used to store the weekly work hour reports submitted by employees.
// Employees can submit their weekly work hours to their supervisors.
// Managers can approve or reject these reports.
// Managers can also view the history of these reports.

export interface WeeklyWorkHourReport {
    reportid: number; // we might need it to look up histories?
    employeeid: number;
    status: 'Pending' | 'Approved' | 'Rejected';
    createdAt: Date;
    week: number;
    year: number;
    hours: number;
    supervisorid: number;

}