import { User } from './user';

export interface Organization {
    PK: `ORG#${string}`;
    name: string;
    address: string;
    phone?: string;
    email?: string;
    website?: string;
    employees: Record<string, User> | Promise<Record<string, User>>;
}
