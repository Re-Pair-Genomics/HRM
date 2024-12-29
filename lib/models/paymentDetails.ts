export interface PaymentDetails {
    paymentMethod: string
    accountHolder: string
    accountNumber: string
    accountExpiration: Date
    accountCVV: number
}
