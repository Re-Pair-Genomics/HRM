class PaymentDetails {

    paymentMethod: string; // direct deposit(debit/credit)
    // TODO: should we store them as integers and convert them to strings when needed?
    accountHolder: string; // name on the account
    accountNumber: string; // 16-digit number for debit/credit
    accountExpiration: Date; // expiration date for debit/credit
    accountCVV: number; // 3-digit number for debit/credit

    constructor(paymentMethod: string, accountHolder: string, accountNumber: string, accountExpiration: Date, accountCVV: number) {
        this.paymentMethod = paymentMethod;
        this.accountHolder = accountHolder;
        this.accountNumber = accountNumber;
        this.accountExpiration = accountExpiration;
        this.accountCVV = accountCVV;
    }
}