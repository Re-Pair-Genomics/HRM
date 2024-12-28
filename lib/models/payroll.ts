export class Payroll {

    readonly timestamp: Date;
    readonly employeeId: string;
    readonly totalHours: number;
    readonly totalPay: number;

    public constructor(
        timestamp: Date,
        employeeId: string,
        totalHours: number,
        totalPay: number
    ) {
        this.timestamp = timestamp;
        this.employeeId = employeeId;
        this.totalHours = totalHours;
        this.totalPay = totalPay;
    }
}