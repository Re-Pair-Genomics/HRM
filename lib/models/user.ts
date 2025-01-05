import { Permission } from './permission';


export interface User {
    PK: `USER#${string}`;
    username: string;
    email: string;
    password: string;
    organizationId?: string;
    profileId?: string;
    paymentInfoId?: string;
    permissions: Record<string, Permission>;
}
