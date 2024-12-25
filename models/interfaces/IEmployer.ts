// A more specific interface for employers.
// Employer is the only person who can create new users, and assign roles to them.

interface IEmployer extends IUser {
    managedUsers: IUser[];
    paymentDetails: PaymentDetails;

    createEmployee(user: IUser): Promise<IEmployee>;
    createManager(user: IUser): Promise<IManager>;
    createEmployer(user: IUser): Promise<IEmployer>;

    // TODO: might be redundant, but just in case
    assignRole(user: IUser, role: string): Promise<IUser>;
    assignPosition(user: IUser, position: string): Promise<IUser>;
}