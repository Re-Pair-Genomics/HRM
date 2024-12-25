// A basic interface for common user attributes and methods
interface IUser {
    id: number;
    firstname: string;
    lastname: string;

    email: string;
    phone: string;
    address: string;

    password: string; // TODO: hashed password
    role: string;
    // part-time employee, full-time employee, junior manager, senior manager, CFO, CEO, etc.
    position: string; // part-time senior developer
    // TODO: enum, IT, HR, etc. But I'm not sure if role and position are the same thing
    createdAt: Date;
    updatedAt: Date;

    save(): Promise<IUser>;
    // delete(): Promise<IUser>; Try not to delete users, just deactivate them
    update(): Promise<IUser>;
    load(): Promise<IUser>;
    validate(): Promise<IUser>;

    login(email: string, password: string): Promise<IUser>;
    logout(): Promise<IUser>;

    get(): Promise<IUser>;
    getAll(): Promise<IUser[]>;
    getByEmail(email: string): Promise<IUser>;
    getById(id: number): Promise<IUser>;
}