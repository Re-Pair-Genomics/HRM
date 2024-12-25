// Employees can see their own information, and update their own information.
// Employees can also submit weekly work hour reports.

import {User} from "@/models/users/User";

export interface Employee extends User{

    status: string; // active, inactive

    hiredate: Date;

    paymentDetails: PaymentDetails;
    workHours: number;
}