export interface Agreement{
    id?: string,
    userId?:number,
    stafId?:number,
    jobDetailsId?:number,
    stafName?:string,
    councilorName?:string,
    councilorId?:number,
    companyId?: string,
    branchId?: string,
    registrationId?: string,
    registrationName?:string,
    agreementDate?: any,
    agreementDescription?: string,
    countryId?: string,

    beforVisaCost?: number,
    registrationFees?: number,
    universityApplicationFees?: number,
    afterVisaServiceCharge?: number,
    grossPayable?:number,
    
    remarks?: string,
}