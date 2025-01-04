import { User } from './user';

export interface Organization {
    PK: `ORG#${string}`;
    name: string;
    address: string;
    phone: string | null;
    email: string | null;
    website: string | null;
    employees: Record<string, User> | Promise<Record<string, User>>;
}
