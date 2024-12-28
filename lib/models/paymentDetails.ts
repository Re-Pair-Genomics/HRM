export class PaymentDetails {

    readonly paymentMethod: string
    readonly accountHolder: string
    readonly accountNumber: string
    readonly accountExpiration: Date
    readonly accountCVV: number

    // static factory method for creating PaymentDetails object
    public static createPaymentDetails({
        paymentMethod,
        accountHolder,
        accountNumber,
        accountExpiration,
        accountCVV
    }: {
        paymentMethod: string;
        accountHolder: string;
        accountNumber: string;
        accountExpiration: Date;
        accountCVV: number;
    }) {
        return new this(
            paymentMethod,
            accountHolder,
            accountNumber,
            accountExpiration,
            accountCVV
        );
    }

    constructor(
        paymentMethod: string,
        accountHolder: string, 
        accountNumber: string, 
        accountExpiration: Date, 
        accountCVV: number
    ) {
        this.paymentMethod = paymentMethod
        this.accountHolder = accountHolder
        this.accountNumber = accountNumber
        this.accountExpiration = accountExpiration
        this.accountCVV = accountCVV
    }
}