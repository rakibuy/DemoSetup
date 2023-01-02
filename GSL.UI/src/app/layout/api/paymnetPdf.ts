export interface paymentPdf{
    
      total?: number,
      fromDate?: any,
      toDate?: any,
      paymentPdfDetials?: paymentPdfDetials[],
}

export interface paymentPdfDetials{
    id?: number,
    partyName?:string,
    invoice?: string,
    amount?: number,
    postingDate?: string,
}