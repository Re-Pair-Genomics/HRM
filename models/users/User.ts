// common user attributes and methods
export interface User{
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
}