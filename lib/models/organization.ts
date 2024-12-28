import { User } from './user';

export class Organization {

    readonly id: string;

    public name: string;
    public address: string;
    public phone: string;
    public email: string;
    public website: string;
    public employees: { [id: string]: User } = {};

    public constructor(
        id: string,
        name: string,
        address: string,
        phone: string,
        email: string,
        website: string,
        employees: { [id: string]: User }
    ) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.website = website;
        this.employees = employees;
    }
}