import { Permission } from './permission';


export interface User {
    PK: `USER#${string}`;
    username: string;
    email: string;
    password: string;
    organizationId: string | null;
    profileId: string | null;
    paymentInfoId: string | null;
    permissions: Record<string, Permission>;
}
