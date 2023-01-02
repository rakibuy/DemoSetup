import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Agreement } from 'src/app/layout/api/agreement';
import { Applys } from 'src/app/layout/api/applys';
import { DocumentUser } from 'src/app/layout/api/document';
import { DocumentCategory, DocumentSubCategory } from 'src/app/layout/api/documentCategories';
import { Email } from 'src/app/layout/api/email';
import { PassportDetail } from 'src/app/layout/api/passportDetail';
import { PersonalInformation } from 'src/app/layout/api/PersonalInformation';
import { Qualification } from 'src/app/layout/api/qualification';
import { Registation } from 'src/app/layout/api/registation';
import { Score } from 'src/app/layout/api/score';
import { User } from 'src/app/layout/api/user';
import { AgreementService } from 'src/app/layout/service/agreement.service';
import { ApplysService } from 'src/app/layout/service/applys.service';
import { AuthService } from 'src/app/layout/service/auth.service';
import { CountryService } from 'src/app/layout/service/country.service';
import { DegreeService } from 'src/app/layout/service/degree.service';
import { DocumentService } from 'src/app/layout/service/document.service';
import { DocumentCategoriesService } from 'src/app/layout/service/documentCategories.service';
import { EmailService } from 'src/app/layout/service/email.service';
import { PassportDetailService } from 'src/app/layout/service/passportDetail.service';
import { PaymentService } from 'src/app/layout/service/payment.service';
import { PersonalInformationService } from 'src/app/layout/service/PersonalInformationService';
import { QualificationService } from 'src/app/layout/service/qualification.service';
import { RegistetionService } from 'src/app/layout/service/registation.service';
import { ScoreService } from 'src/app/layout/service/score.service';
import { SubjectService } from 'src/app/layout/service/subject.service';
import { UniversityService } from 'src/app/layout/service/university.service';
import { UserService } from 'src/app/layout/service/user.service';
import { environment } from 'src/environments/environment';

@Component({
    templateUrl: './addoredit.component.html',
    providers: [MessageService, ConfirmationService]
})
export class AddoreditComponent implements OnInit {
    id:number = 0;
    activeIndex1:number= 0;
    //common
    todayDate:any= new Date();
    TodayDate =this.datePipe.transform(this.todayDate,'yyyy-MM-dd');

    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    filteredCountries: any[] = [];
    selectedCountryAdvanced: any[] = [];

    //user
    user:User={}
    users:User[]=[]

    // Visitor
    registration:Registation={}
    Email:any =""    

    //dropdown
    subjects:any;
    stafList:any;
    councilorList:any;
    councilorListByUserId:any;
    agreementListByUserId:any;
    countries: any[] = [];
    univeristyList:any;
    statusList:any[]=[
      {name: "Select", code:"S0"},
      {name: "Pending", code:"S1"},
      {name: "Done", code:"S2"},
      {name:"Rejected", code:"S3"}
    ]

    GenderList:any[]=[
      {name: "Select", code:"G0"},
      {name: "Male", code:"G1"},
      {name: "Female", code:"G2"},
      {name:"Others", code:"G3"}
    ]

    MaritalList:any[]=[
      {name: "Select", code:"M0"},
      {name: "Married", code:"M1"},
      {name: "Unmarried", code:"M2"},
      
    ]
    subCategories:DocumentSubCategory[]=[]
    CategoriesBySubId:DocumentCategory[]=[]
    categoryId:string=""

    nodes: any[]=[];

    selectedNode: any;

    degerlist:any[]=[]; 
        
    adminStafCouncilorAuthorize:any;
    adminStafCouncilorAuthorizeHaveAccess:boolean=false;

    constructor(

      //authentication
        private authServicve:AuthService,
        private messageService: MessageService,
        private router: Router, 
        private route:ActivatedRoute,

      //Start Dropdown list
        private subjectService:SubjectService,  
        private countryService: CountryService, 
        private universityService:UniversityService,
        private degreeService:DegreeService,
        private documentCategorieService:DocumentCategoriesService,
      //End DropDown list
        

        private userService:UserService,
        private qualificationService:QualificationService,
        private scoreService:ScoreService,
        private agreementService:AgreementService,
        private passportDetailsService:PassportDetailService,
        private documentService:DocumentService,
        private applyService:ApplysService,
        private personalInfoService:PersonalInformationService,
        private paymentService:PaymentService,
        private registrationService:RegistetionService,

        private emailService:EmailService,
        private http: HttpClient,
        private datePipe:DatePipe,
       ) {}

       ngOnInit(): void {

        //dropdown list
        this.userService.getAllCouncilor().subscribe((data:any)=>{
          this.councilorList = data;
        })
        this.userService.getAllStaf().subscribe((data:any)=>{
          this.stafList = data;
        })
        this.subjectService.getAll().subscribe((data:any)=>{
          this.subjects = data;
        })

        this.universityService.getAll().subscribe((data:any)=>{
          this.univeristyList = data;
        })

        this.documentCategorieService.getAll().subscribe((data:any)=>{
          this.subCategories = data;
        })
       
        this.countryService.getCountries().then((data:any)=>{
          this.countries = data;
        })

        this.degreeService.getAll().subscribe((data:any)=>{
          this.degerlist = data;
        })

        this.countryService.getDropdownList().then(files => this.nodes = files);

        //route selected 
         this.id= this.route.snapshot.params['routeId'];
         if(this.id != undefined){
          this.adminStafCouncilorAuthorize = this.authServicve.HaveAccess();
          if((this.adminStafCouncilorAuthorize == "Admin") ||(this.adminStafCouncilorAuthorize == "Staf")  || (this.adminStafCouncilorAuthorize == "Councilor"))
          {
            this.adminStafCouncilorAuthorizeHaveAccess = true;
          }
          
          
         
        //payment Info
          this.paymentService.amountDetials(this.id).subscribe(data=>{
            this.amountDetials = data;
          })

        //councilor Dorpdown
          this.agreementService.dropdownCouncilrByUserId(this.id).subscribe((data:any)=>{
            this.councilorListByUserId = data;
          })

        //agreement Dorpdown
           this.applyService.dropdownAgrementByUserId(this.id).subscribe((data:any)=>{
            this.agreementListByUserId = data;
          })

        //Users
          this.userService.find(this.id).subscribe((data:any)=>{
            this.users = data;
            this.user =data;
            this.Email=this.user.email
          })

        //visitor info
          this.registrationService.visitorInfo(this.id).subscribe((data:any)=>{
            this.registration =data;
            let DOB = this.datePipe.transform(this.registration.dob,'yyyy-MM-dd');
            this.registration.dob = DOB

           
            
          })

          //Personal Information
          this.personalInfoService.GetUserById(this.id).subscribe((data:any)=>{
            let issuDateValu = this.datePipe.transform(data.birthDate,'yyyy-MM-dd');
            this.pInfo=data;
            this.pInfo.birthDate = issuDateValu;
          })
           //Acadamic Qualification
           this.qualificationService.findByUserId(this.id).subscribe((data:any)=>{
            this.qualifications=data;
          })

           //Score
           this.scoreService.findByUserId(this.id).subscribe((data:any)=>{
            this.scores=data;
            
          })

          //apply
          this.applyService.GetByUserId(this.id).subscribe((data:any)=>{
            this.applys=data;
            
          })

           //Agreement
           this.agreementService.findByUserId(this.id).subscribe((data:any)=>{
            this.agreements=data;
           
          })

          //Documents
          this.documentService.findByUserId(this.id).subscribe((data:any)=>{
            
            this.documents=data;
            this.document = data;

            //documentCategoryId
            this.subCatagoryById(2)
           
           
          })

           //Passport Details
           this.passportDetailsService.findByUserId(this.id).subscribe((data:any)=>{
            this.passports=data;
            
          })

         }

       }
       //pdf
       profilePdfDwonload(id:any){
        this.userService.GenerateProfilePdf(id).subscribe(res=>{
          let blob:Blob = res.body as Blob;
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.download=id;
          a.href = url;
          a.click();
        })
       }


       //js pdf start
       @ViewChild('contentJsPdf',{static:true}) el!:ElementRef<HTMLImageElement>
      //  @ViewChild('contentJsPdf', {static:false}) el!:ElementRef;
      //  exportPDF(){
      //   let pdf = new jsPDF('p', "pt", "a4")
      //   pdf.html(this.el.nativeElement,{
      //     callback:(pdf)=>{
      //       pdf.save("sample.pdf")
      //     }
      //   })
      //  }
       exportPDF(){
        html2canvas(this.el.nativeElement).then((canvas)=>{
          const imgData = canvas.toDataURL('image/jpeg')

          const pdf = new jsPDF({
            orientation:'portrait'
          })
          const imageProps = pdf.getImageProperties(imgData)
          const pdfw = pdf.internal.pageSize.getWidth()
          const pdfh = (imageProps.height * pdfw)/imageProps.width
          pdf.addImage(imgData, 'PNG', 0, 0, pdfw, pdfh)
          pdf.save("output.pdf")
        })
       }

      // maexportPDFkePdf() { 
      //   const doc = new jsPDF();
      //   doc.html(this.contentJsPdf.nativeElement, function() {
      //      doc.save("obrz.pdf");
      //   });
      // }

       profilePdfPreview(id:any){
          this.userService.GenerateProfilePdf(id).subscribe(res=>{
            let blob:Blob = res.body as Blob;
            let url = window.URL.createObjectURL(blob);
            window.open(url);
          })
       };

       //js pdf end

       //user
       userAddOrUpdate(){
       }


      // Email Service
       email:Email={}
       newEmail() {
        this.emailDialog=true;
        this.submitted = false;
        this.email={
          toEmail:this.Email       
        }
      }

      hideDialognEmail(){
        this.emailDialog = false;
      }
      emailDialog: boolean = false;

      addEmail(){
        this.emailService.create(this.email).subscribe(res => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Save', life: 3000 });
        })
        this.emailDialog=false;
        this.email={}

      }
      


//Personal Information Start    
pInfo:PersonalInformation={
  userId:this.id,
  firstName:"test",
  lastName:"lastName",
  birthDate: new Date(),
  numberOfDependent: "No"

}
pInfos:PersonalInformation[]=[]

addOrUpdatePersonalInfo(){
  this.submitted = true;

  this.pInfo.userId = this.id;
  
 
    if(this.pInfo.id){
     
      this.personalInfoService.update(this.pInfo.id, this.pInfo).subscribe(res => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Save', life: 3000 });
        this.ngOnInit();
      })
    }
    else{ 
      
      
      this.personalInfoService.create(this.pInfo).subscribe(res => {
       
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Save', life: 3000 });
        this.ngOnInit();
      })
    }
  

}




//Qualification Start    
    qualification:Qualification={}
    qualifications:Qualification[]=[]
    qualificationDialog: boolean = false;
    newQualification() {
      this.submitted = false;
      this.qualificationDialog = true;
      this.qualification={
        userId:this.id
      }
  }

  hideDialognQualification() {
    this.qualificationDialog = false;
    this.submitted = false;
}
editQualification(qualification: Qualification) {
  this.qualification = { ...qualification }; 
  this.qualificationDialog = true;
}
addOrUpdateQualification(){
  this.submitted = true;
  if(this.qualification.degreeName?.trim() && 
  this.qualification.subjectName?.trim() &&
  this.qualification.result?.valueOf() &&
  this.qualification.passingYear?.trim()){

    if(this.qualification.id){
         
      this.qualificationService.update(this.qualification.id, this.qualification).subscribe(res => {
        
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Save', life: 3000 });
        this.ngOnInit()
      })
    }
    else{ 
      this.qualificationService.create(this.qualification).subscribe(res => {
       
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Save', life: 3000 });
        this.ngOnInit()
      })
    }
  this.qualifications = [...this.qualifications]
  this.qualificationDialog = false;

  }

       
      
}
//Qualification End

//Score Start  

score:Score={}
scores:Score[]=[]
scoreDialog: boolean = false;

scoreNames = [
  {name: 'IELTS', code: 'IELTS'},
  {name: 'TOEFL', code: 'TOEFL'},
  {name: 'PTE', code: 'PTE'},
  {name: 'GRE', code: 'GRE'},
];





newScore() {
  this.submitted = false;
  this.scoreDialog = true;
  this.score={
    userId:this.id
  }
}

hideDialognScore() {
this.scoreDialog = false;
this.submitted = false;
}
editScore(score: Score) {
this.score = { ...score }; 
this.scoreDialog = true;
}
addOrUpdateScore(){
this.submitted = true;
  if(this.score.scoreName?.trim &&
    this.score.listening?.valueOf &&
    this.score.overallScore?.valueOf &&
    this.score.reading?.valueOf &&
    this.score.speaking?.valueOf &&
    this.score.writing?.valueOf 
    ){

      if(this.score.id){
     
        this.scoreService.update(this.score.id, this.score).subscribe(res => {
          
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Save', life: 3000 });
          this.ngOnInit();
        })
      }
      else{ 
        this.scoreService.create(this.score).subscribe(res => {
          
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Save', life: 3000 });
          this.ngOnInit();
        })
      }
    this.scores = [...this.scores]
    this.scoreDialog = false;

    }

  
  
}



//Apply Start    
apply:Applys={}
applys:Applys[]=[]
applyDialog: boolean = false;


newApply() {
  this.submitted = false;
  this.applyDialog = true;
  this.apply={
    userId:this.id,
    issuDate:this.TodayDate,
    applyDate:this.TodayDate,
    followUpDate:this.TodayDate,
    status:"S1"
  }
}

hideDialognApply() {
this.applyDialog = false;
this.submitted = false;
}
editApply(apply: Applys) {
  let IssuDate = this.datePipe.transform(apply.issuDate, 'yyyy-MM-dd')
  let ApplyDate = this.datePipe.transform(apply.applyDate, 'yyyy-MM-dd')
  let FollowUpDate = this.datePipe.transform(apply.followUpDate, 'yyyy-MM-dd')
this.apply = { ...apply }; 
this.apply.issuDate = IssuDate;
this.apply.applyDate = ApplyDate;
this.apply.followUpDate = FollowUpDate;
this.applyDialog = true;
}
addOrUpdateApply(){
this.submitted = true;
  if(this.apply.agreementId?.valueOf() &&
    this.apply.universityId?.valueOf() &&
    this.apply.subjectId?.valueOf() &&
    this.apply.issuDate.trim() &&
    this.apply.applyDate.trim() &&
    this.apply.followUpDate.trim() 
      
  ){

    if(this.apply.id){
     
      this.applyService.update(this.apply.id, this.apply).subscribe(res => {
       
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Save', life: 3000 });
        this.ngOnInit()
      })
    }
    else{ 
      this.applyService.create(this.apply).subscribe(res => {
        
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Save', life: 3000 });
        this.ngOnInit()
      })
    }
  this.applys = [...this.applys]
  this.applyDialog = false;

  }

    
  
}

//Document Start  
document:DocumentUser={}
documents:DocumentUser[]=[]
documentDialog: boolean = false;
catId:string="";
CategoryId?:string;
CategorySubId?:string;
catImg:string = "";
newDocument() {
  this.submitted = false;
  this.documentDialog= true;
  this.document={
    userId:this.id
  }
  this.categoryId="";
  this.catId = "";
  this.catImg = "";
  
}

hideDialognDocument() {
this.documentDialog = false;
this.submitted = false;
}


//DropDown
subCatagoryById(event:any){

let eventId = event
 this.documentCategorieService.findBysubCategory(eventId).subscribe((data:any)=>{
   this.CategoriesBySubId = data;
 })

}


editDocument(document: DocumentUser) {
  this.document = { ...document }; 
  this.CategoryId= this.document.documentCategoryId;
  this.CategorySubId = this.document.subCategoryId;
  this.subCatagoryById(this.CategorySubId);
  this.documentDialog = true;
  
  }


//File Upload Start
selectedFiles: string[]=[]






onFileChange(event:any) {
  for (var i = 0; i < event.target.files.length; i++) {
    this.selectedFiles.push(event.target.files[i]);
  }
}

AddFile(){
  this.submitted = true;
  if(this.catImg.trim() &&
    this.CategoryId?.valueOf && this.CategorySubId?.valueOf){
      if(this.document.id){

        // if (this.selectedFiles.length === 0) {
        //   return;
        // }
      
        const formData = new FormData();
        for (var i = 0; i < this.selectedFiles.length; i++) {
          formData.append("files", this.selectedFiles[i]);
        }
        //let fileToUpload = this.uploadedFiles[0] 
        
       
        this.http.post(`${environment.baseUrl}/Documents/UpdateDocument/${this.document.id}/${this.id}/${this.CategorySubId}/${this.CategoryId}/UserImage`, formData)   
        .subscribe(resp=>{
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Save', life: 3000 });
          this.ngOnInit();
        });
        this.documentDialog=false;
        this.selectedFiles=[];
        this.categoryId="";
        this.catId = "";
        this.catImg = "";
    
      }else{
    
        if (this.selectedFiles.length === 0) {
          return;
        }
      
        const formData = new FormData();
        for (var i = 0; i < this.selectedFiles.length; i++) {
          formData.append("files", this.selectedFiles[i]);
        }
        //let fileToUpload = this.uploadedFiles[0]
        
       
        this.http.post(`${environment.baseUrl}/Documents/AddDocumentFile/${this.id}/${this.CategorySubId}/${this.CategoryId}/UserImage`, formData)   
        .subscribe(resp=>{
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Save', life: 3000 });
          this.ngOnInit();
        });
        this.documentDialog=false;
        this.selectedFiles=[];
        this.categoryId="";
        this.catId = "";
        this.catImg = "";
    
      }
      
    }
}


///download
downloadDocument(fileName:any){
  this.documentService.download(fileName).subscribe(res => {
    let blob:Blob = res.body as Blob;
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.download=fileName;
    a.href = url;
    a.click();
  })
}
//delete Document
deleteDocument(id:number){
  this.documentService.delete(id).subscribe(res=>{
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Delete', life: 3000 });
    this.ngOnInit();
  })
}


addOrUpdateDocument(){
this.submitted = true;

    if(this.qualification.id){
     
      this.qualificationService.update(this.qualification.id, this.qualification).subscribe(res => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Save', life: 3000 });
        this.ngOnInit();
      })
    }
    else{ 
      this.qualificationService.create(this.qualification).subscribe(res => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Save', life: 3000 });
        this.ngOnInit();
      })
    }
  this.qualifications = [...this.qualifications]
  this.qualificationDialog = false;
  
}
//Document End



//Uploade
onBasicUpload(event:any) {
  this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
}

uploadFile = (files:any) => {
  if (files.length === 0) {
    return;
  }

  let fileToUpload = <File>files[0];
  const formData = new FormData();
  formData.append('file', fileToUpload, fileToUpload.name);
  this.http.post(`${environment.baseUrl}/User/UserImage/${this.id}/UserImage`, formData, {reportProgress: true, observe: 'events'})        
  .subscribe(res=>{
    this.ngOnInit();
  });
}




//Passport Start    
passport:PassportDetail={
  issueDate:this.TodayDate,
    expireDate:this.TodayDate
}
passports:PassportDetail[]=[]
passportDialog: boolean = false;
newPassport() {
  this.submitted = false;
  
  this.passportDialog = true;
  this.passport={
    userId:this.id,
    issueDate:this.TodayDate,
    expireDate:this.TodayDate
  }
}

hideDialognPassport() {
this.passportDialog = false;
this.submitted = false;
}
editPassport(passport: PassportDetail) {
  let IssusDate = this.datePipe.transform(passport.issueDate, 'yyyy-MM-dd')
  let ExpairDate = this.datePipe.transform(passport.expireDate, 'yyyy-MM-dd')
this.passport = { ...passport };
this.passport.issueDate = IssusDate;
this.passport.expireDate = ExpairDate;

this.passportDialog = true;
}
addOrUpdatePassport(){
this.submitted = true;

    if(
      this.passport.passportNumber?.trim() &&
      this.passport.placeOfIssue?.trim() &&
      this.passport.issueDate.trim() &&
      this.passport.expireDate.trim()
      ){
        if(this.passport.id){
     
          this.passportDetailsService.update(this.passport.id, this.passport).subscribe(res => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Save', life: 3000 });
            this.ngOnInit()
          })
        }
        else{ 
          this.passportDetailsService.create(this.passport).subscribe(res => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Save', life: 3000 });
            this.ngOnInit()
          })
        }
      this.passports = [...this.passports]
      this.passportDialog = false;

      }
}
//Passport End

//Payment Details
amountDetials:any={}

//Agreement Start
jobDetailsChack:boolean= false
agreement:Agreement={
  afterVisaServiceCharge:0,
  beforVisaCost:0,
  registrationFees:0,
  universityApplicationFees:0,
  grossPayable:0,
  agreementDate:this.TodayDate
  
}

agreements:Agreement[]=[]

agreementDialog: boolean = false;
newAgreement() {
  this.submitted = false;
  this.agreementDialog = true;
  this.agreement={
    userId:this.id,
    beforVisaCost:0,
    registrationFees:0,
    afterVisaServiceCharge:0,
    universityApplicationFees:0,
    grossPayable:0,
    agreementDate:this.TodayDate
   
  }

}
totalCostCalculation(){
  this.agreement.grossPayable = Number(this.agreement.beforVisaCost)  + Number(this.agreement.registrationFees) + Number(this.agreement.afterVisaServiceCharge) + Number(this.agreement.universityApplicationFees)
}

hideDialognAgreement() {
this.agreementDialog = false;
this.submitted = false;
}
editAgreement(agreement: Agreement) {

let AgreemetnDate = this.datePipe.transform(agreement.agreementDate, 'yyyy-MM-dd')

this.agreement = { ...agreement }; 
this.agreement.agreementDate = AgreemetnDate;
if(agreement.jobDetailsId){
  this.jobDetailsChack = true;
}
console.log(this.agreement)
this.agreementDialog = true;
}
addOrUpdateAgreement(){
this.submitted = true;

if(this.agreement.jobDetailsId?.valueOf() && this.agreement.countryId?.trim() && this.agreement.agreementDate?.trim()){
  if(this.agreement.id){
     
    
    this.agreementService.update(this.agreement.id, this.agreement).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Save', life: 3000 });
      this.ngOnInit();
      this.agreements = [...this.agreements]
      this.agreementDialog = false;
    })
  }
  else{ 
    
    this.agreementService.create(this.agreement).subscribe({
      next:(res) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Save', life: 3000 });
        this.ngOnInit();
        this.agreements = [...this.agreements]
        this.agreementDialog = false;
      },
      error:(error)=>{
        this.messageService.add({ severity: 'error', summary: 'Something Wrong', detail: 'Duplicate Agreement', life: 3000 });
      }
    })
  }

  
}
}
//Agreement Details end    

       onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    
    filterCountry(event: any) {
      const filtered: any[] = [];
      const query = event.query;
      for (let i = 0; i < this.countries.length; i++) {
          const country = this.countries[i];
          if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(country);
          }
      }
    
      this.filteredCountries = filtered;
    }


    reloadePage(index:number){
      this.activeIndex1=index;
      this.showmassage()
      
    }
    
    showmassage(){
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Save', life: 3000 });
    }
    
    
 }
