export class UserProfile {

    readonly firstname: string;
    readonly lastname: string;
    readonly title: string;  // employee title (CEO, Senior Manager...) for labelling and display only
    readonly email: string;
    readonly phone: string;
    readonly address: string;

    public constructor(
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