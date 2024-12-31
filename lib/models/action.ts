import { User } from './user';

export type ActionScope =
    | { type: 'AllUsers' }
    | { type: 'ThisUser' }
    | { type: 'SelectedUsers'; users: User[] };

export interface Action {
    name: string;
    description: string;
    scope: ActionScope;
    execute(): void;
}
