// A more specific interface for managers.
// Managers can only manage users(activate/deactivate users), and handle weekly work hour reports.


interface IManager extends IUser {
    managedUsers: IEmployee[];

    manageUser(user: IUser): Promise<IUser>;
    // TODO: should they be able to unmanage users?
    unmanageUser(user: IUser): Promise<IUser>;
    activateUser(user: IUser): Promise<IUser>;
    deactivateUser(user: IUser): Promise<IUser>;

    handleWorkHourReport(report: WorkHourReport): Promise<WorkHourReport>;

}

