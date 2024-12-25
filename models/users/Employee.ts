// Employees can see their own information, and update their own information.
// Employees can also submit weekly work hour reports.

import {User} from "@/models/users/User";
import {WeeklyWorkHourReport} from "@/models/Reports/WeeklyWorkHourReport";

export interface Employee extends User{

    status: 'Active' | 'Inactive';
    reportSubmitted: boolean;

    hiredate: Date;

    paymentDetails: PaymentDetails;
    reports: WeeklyWorkHourReport[];

    submitWorkHours(hours: number, supervisorid: number): Promise<Employee>;
}