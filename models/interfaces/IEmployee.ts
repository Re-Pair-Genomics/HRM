// A more specific interface for all employees.
// Employees can see their own information, and update their own information.
// Employees can also submit weekly work hour reports.


interface IEmployee extends IUser {
    payrate: number; // $/hour, should be converted to $/year for salary employees
    payperiod: string; // weekly, bi-weekly, monthly, yearly
    paymentDetails: PaymentDetails;
    workHours: number;

    // Employees should be able to submit their work hours to their supervisors
    submitWorkHours(hours: number, supervisorid: number): Promise<IEmployee>;
}