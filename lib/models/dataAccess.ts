import { Organization } from "./organization";
import { User } from "./user";

export interface DataAccess {
    getUserById: (id: string) => User | Promise<User>;
    updateUserById: (user: Partial<User> & { id: string }) => User | Promise<User>;
    deleteUserById: (id: string) => boolean | Promise<boolean>;
    getOrganizationById: (id: string) => Organization | Promise<Organization>;
    updateOrganizationById: (organization: Partial<Organization> & { id: string }) => Organization | Promise<Organization>;
    deleteOrganizationById: (id: string) => boolean | Promise<boolean>;
}
