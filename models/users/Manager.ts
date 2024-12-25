// Managers can manage users(activate/deactivate users)
// They can also handle weekly work hour reports.

import {Employee} from "@/models/users/Employee";
import {User} from "@/models/users/User";
import {WeeklyWorkHourReport} from "@/models/Reports/WeeklyWorkHourReport";

export interface Manager extends User{

    managedEmployees: Employee[];

    reviewWorkHourReport(report: WeeklyWorkHourReport): Promise<WeeklyWorkHourReport>;
    activateEmployee(employee: Employee): Promise<Employee>;
    deactivateEmployee(employee: Employee): Promise<Employee>;
}