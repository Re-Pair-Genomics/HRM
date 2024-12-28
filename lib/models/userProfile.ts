export class UserProfile {

    readonly firstname: string;
    readonly lastname: string;
    readonly title: string;  // employee title (CEO, Senior Manager...) for labelling and display only
    readonly email: string;
    readonly phone: string;
    readonly address: string;

    // static factory method for creating UserProfile object
    public static createUserProfile({
        firstname,
        lastname,
        title,
        email,
        phone,
        address
    }: {
        firstname: string;
        lastname: string;
        title: string;
        email: string;
        phone: string;
        address: string;
    }) {
        return new this(
            firstname,
            lastname,
            title,
            email,
            phone,
            address
        );
    }

    constructor(
        firstname: string,
        lastname: string,
        title: string,
        email: string,
        phone: string,
        address: string
    ) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.title = title;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }

}