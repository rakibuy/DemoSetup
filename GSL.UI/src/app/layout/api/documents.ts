export interface Documents{
    
      id?: string,
      issueDate?: any,
      clientId?: string,
      patientId?: string,
      documentDetails?: DocumentDetails[]
}

export interface DocumentDetails{

    id?: string,
    documentMasterId?: string,
    documentTitle?: string,
    documentNo?: string
   
    documentType?: string,
    documentSize?: string,
    url?: string,
    extension?: string,
    dbPath?:string;

}