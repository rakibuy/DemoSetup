export interface InvoicePdf{
  id?: number,
  name?: string,
  phone?: string,
  email?: string,
  postingDate?: any,
  voucherDate?: any,
  subtotal?: number,
  agreementAmount?: number,
  singleTotalPay?: number,
  reminingPay?: number,
  totalAgreement?: number,
  totalAmount?: number,
  totalPay?: number,
  reminingTotalPay?: number
  invoicePdfDetials?: invoicePdfDetials[],
}
export interface invoicePdfDetials{

    id: number,
    description: string,
    amount: number

}