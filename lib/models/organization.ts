export interface Organization {
    PK: `ORG#${string}`;
    name: string;
    address: string;
    phone?: string;
    email?: string;
    website?: string;
    employees: string[];
}
