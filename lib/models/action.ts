export interface Action {
    name: string;
    description: string;
    execute(): void;
}
