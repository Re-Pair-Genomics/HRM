export const createOrganizationPermission = { createOrganization: true };
export const joinOrganizationPermission = { joinOrganization: true };
export type CreateOrganizationPermission = typeof createOrganizationPermission;
export type JoinOrganizationPermission = typeof joinOrganizationPermission;

export type Permissions =
    | CreateOrganizationPermission
    | JoinOrganizationPermission;
export type PermissionKey = keyof Permissions;

// categories of permission groups
// Admins have all permissions for operations within the organization
export const admin = {
    createOrganization: false,
    joinOrganization: false
};

export const employee = {
    createOrganization: false,
    joinOrganization: false
};
