import { PutCommandOutput } from '@aws-sdk/lib-dynamodb';
import { QueryCommandOutput } from '@aws-sdk/lib-dynamodb';

export class CreateUserFailedError extends Error {
    response: PutCommandOutput;
    constructor(response: PutCommandOutput) {
        super('Failed to create user');
        this.response = response;
    }
}

export class DuplicateUsernameError extends Error {
    response: QueryCommandOutput;
    constructor(response: QueryCommandOutput) {
        super('Username already exists');
        this.response = response;
    }
}

export class DuplicateEmailError extends Error {
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