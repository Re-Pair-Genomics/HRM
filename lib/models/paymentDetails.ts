export interface PaymentDetails {
    PK: `PAYMENT#${string}`;
    paymentMethod: string;
    accountHolder: string;
    accountNumber: string;
    accountExpiration: Date;
    accountCVV: number;
}
