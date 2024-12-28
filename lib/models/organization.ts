import { User } from './user';

export interface Organization {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    employees: Record<string, User>;
}
