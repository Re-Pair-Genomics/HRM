export type CreateOrganization = { createOrganization: true };
export type JoinOrganization = { joinOrganization: true };

export type Permissions = CreateOrganization & JoinOrganization;
export type PermissionKey = keyof Permissions;
