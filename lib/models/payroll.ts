export class Payroll {

    readonly timestamp: Date;
    readonly employeeId: string;
    readonly totalHours: number;
    readonly totalPay: number;

    // static factory method for creating Payroll object
    public static createPayroll({
        timestamp,
        employeeId,
        totalHours,
        totalPay
    }: {
        timestamp: Date;
        employeeId: string;
        totalHours: number;
        totalPay: number;
    }) {
        return new this(
            timestamp,
            employeeId,
            totalHours,
            totalPay
        );
    }

    constructor(
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