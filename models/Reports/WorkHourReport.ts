// TODO: unsure if this is the correct way to implement this class
class WorkHourReport
{
    employeeId: number;
    hours: number;
    payrate: number;
    supervisorId: number;
    approved: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(employeeId: number, hours: number, payrate: number, supervisorId: number, approved: boolean, createdAt: Date, updatedAt: Date) {
        this.employeeId = employeeId;
        this.hours = hours;
        this.payrate = payrate;
        this.supervisorId = supervisorId;
        this.approved = approved;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}