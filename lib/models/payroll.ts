export interface Payroll {
    PK: `PAYROLL#${string}`;
    timestamp: Date;
    employeeId: string;
    totalHours: number;
    totalPay: number;
}
