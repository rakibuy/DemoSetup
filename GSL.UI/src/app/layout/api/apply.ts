export interface ApplyMaster{

    id?: string,
    issueDate?: any,
    applyDate?: any,
    registrationId?: string,
    registrationName?:string,
    staffId?:string,
    status?:string,
    applyDetails?: ApplyDetails[]
 
}
export interface ApplyDetails{
      id?: string,
      applyMasterId?: string,
      countryId?: string,
      subjectId?: string,
      followUpDate?: any
}