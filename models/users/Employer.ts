// Employer is the only person who can create new users.
// Employer is the person who pays the employees.

import {Employee} from "@/models/users/Employee";
import {User} from "@/models/users/User";

export interface Employer extends User{

    managedEmployees: Employee[];
    paymentDetails: PaymentDetails;

    createEmployee(user: User): Promise<Employee>;
}
