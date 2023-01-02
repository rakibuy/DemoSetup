export interface JobAssign{
        id?: number,
        assignToId?: number,
        assignToName?:string,
        //userId?:number,
        issueDate?: any,
        //ticketNo?: string,
        assignJobDetails?:assignJobDetails[]
}

export interface assignJobDetails{

        id?: 0,
        assignJobMasterId?: number,
        councilorId?: number,
        visitorId?: string,
        jobAssignToId?: number,
        userId?:number,

        nextFollowupDate?: Date,
        preferenceCountry?: string, 
        councilorRemarks?: string, 


        status?: string,
        issueDate?: Date,
        stafName?: string,
        councilorName?: string,
        userName?: string,

        councilorStatus?:string,
        agreementIssueStatus?:string,
        remarksFrompersonal?:string,

        totalAgrementNumber?: number
        totalPayable?: number,
        totalPay?: number,
        remainigPay?: number,
        

}


