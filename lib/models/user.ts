import { Permissions, PermissionKey } from './permission';

export interface User {
    PK: `USER#${string}`;
    username: string;
    email: string;
    password: string;
    permissions: Record<PermissionKey, boolean>;
    organizationId?: string;
    profileId?: string;
    paymentInfoId?: string;
}


declare const phantom: unique symbol;
export type AuthorizedUser<T extends Partial<Permissions>> = User & {
    [phantom]: T;
};

type AuthorizeResult<T extends Permissions> = 
    | { type: "ok"; user: AuthorizedUser<T> }
    | { type: "fail"; reason: string }
    
function authorize<T extends Permissions>(
    user: User,
    permission: T
): AuthorizeResult<T> {

    const keys = Object.keys(permission) as PermissionKey[];
    if (keys.every(key => user.permissions[key])) {
        return { type: "ok", user: user as AuthorizedUser<T> };
    } else {
        return { type: "fail", reason: "Permission denied" };
    }
}

export function hasPermission<T extends Permissions>(
    user: User,
    permission: T
): user is AuthorizedUser<T> {
    return authorize(user, permission).type === "ok";
}