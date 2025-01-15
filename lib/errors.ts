import {
    PutCommandOutput,
    TransactWriteCommandOutput
} from '@aws-sdk/lib-dynamodb';
import { QueryCommandOutput } from '@aws-sdk/lib-dynamodb';
import { User } from './models/user';

export class CreateUserFailedError extends Error {
    response: PutCommandOutput;
    constructor(response: PutCommandOutput) {
        super('Failed to create user');
        this.response = response;
    }
}

export class UsernameAlreadyExistError extends Error {
    response: QueryCommandOutput;
    constructor(response: QueryCommandOutput) {
        super('Username already exists');
        this.response = response;
    }
}

export class EmailAlreadyExistError extends Error {
    response: QueryCommandOutput;
    constructor(response: QueryCommandOutput) {
        super('Email already exists');
        this.response = response;
    }
}

export class LoginFailedError extends Error {
    response: QueryCommandOutput;
    constructor(response: QueryCommandOutput) {
        super('Login failed');
        this.response = response;
    }
}

export class UserNotFoundError extends Error {
    response: QueryCommandOutput;
    constructor(response: QueryCommandOutput) {
        super('User not found');
        this.response = response;
    }
}

export class WrongPasswordError extends Error {
    response: QueryCommandOutput;
    constructor(response: QueryCommandOutput) {
        super('Wrong password');
        this.response = response;
    }
}

export class PermissionError extends Error {
    user?: User;
    constructor(user?: User) {
        super('Permission denied');
        this.user = user;
    }
}

export class OrganizationAlreadyExistError extends Error {
    response: TransactWriteCommandOutput;
    constructor(response: TransactWriteCommandOutput) {
        super('Organization already exists');
        this.response = response;
    }
}

export class CreateOrganizationFailedError extends Error {
    response: TransactWriteCommandOutput;
    constructor(response: TransactWriteCommandOutput) {
        super('Failed to create organization');
        this.response = response;
    }
}

// Not sure if we should change name to invalid invitation code
export class OrganizationNotFoundError extends Error {
    response: QueryCommandOutput;
    constructor(response: QueryCommandOutput) {
        super('Organization not found');
        this.response = response;
    }
}
