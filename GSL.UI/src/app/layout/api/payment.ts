export interface Payment{
    id?: number,
    voucherNo?: string,
    partyId?: number,
    partyName?:string,
    agreementId?:number,
    postingDate?: any,
    voucherDate?: any,
    narration?: string,
    totalAmount?: number,
    totalAmountType?: string
    paymentsDetails?: PaymentsDetails[]


}
export interface PaymentsDetails{
    id?: number,
    paymentId?: number,
    amountTitle?: string,
    amount?: number,
    amountType?: string
}