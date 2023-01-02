import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Country } from 'src/app/layout/api/countrie';
import { DocumentDetails, Documents } from 'src/app/layout/api/documents';
import { Upload } from 'src/app/layout/api/upload';
import { CountryService } from 'src/app/layout/service/country.service';
import { DocumentsService } from 'src/app/layout/service/documents.service';
import { RegisterService } from 'src/app/layout/service/register.service';
import { SubjectService } from 'src/app/layout/service/subject.service';
import { UserService } from 'src/app/layout/service/user.service';

@Component({
    templateUrl: './addoredit.component.html',
    providers: [MessageService, ConfirmationService]
})
export class AddoreditComponent implements OnInit {
  formvariant! : FormArray<any>
  documents: Documents[] = [];
  document: Documents = {
  
  };
      editdata:any;
      id!:string;

      //dropdown
      country:Country[]=[]
      countries: any[] = [];
      studenregistation:any;
      valu:any;
      filteredCountries: any[] = [];
      studentSubject:any;
      staffNames:any;     
      submitted: boolean = false;
      cols: any[] = [];
      statuses: any[] = [];  
      rowsPerPageOptions = [5, 10, 20];
      product!: {};
      URL:string="";

      imageValu!:[]

      constructor(
        private messageService: MessageService, 
        private countryService: CountryService,
        private registerService:RegisterService,
        private documentsService:DocumentsService,
        private datePipe:DatePipe,
        private fb:FormBuilder,
        private route:ActivatedRoute,
        public subjectService: SubjectService,
        public userService:UserService,
        public router:Router,
        private http:HttpClient
        ) { }

   
       

     //file upload start
        
     response:DocumentDetails={
      dbPath: "ddd"
    }

   

    uploadFinished = (event:any) => { 
      this.response = event;
    }
    dburl:DocumentDetails ={
      url:this.response.dbPath
      
      
    }

    //file upload end
  
      ngOnInit(): void {

        this.getAllDocument(this.document);
        this.countryService.getCountries().then(countries => {
        this.countries = countries;
      });
      

      this.registerService.getAll().subscribe(data => {
        this.studenregistation=data;
      })

      this.subjectService.getAll().subscribe(data=>{
        this.studentSubject=data;
      })
      this.userService.getAll().subscribe(data=>{
        this.staffNames = data;
      })

      

      //route selected
      
      this.id= this.route.snapshot.params['documentId'];
     
      if(this.id != undefined){
        //applyDetials table valu set
        this.documentsService.find(this.id).subscribe((data: any)=>{
         
          let issuDateValu =this.datePipe.transform(data.issueDate,'yyyy-MM-dd');
          this.editdata = data;
          this.editdata.issueDate = issuDateValu;
          
   
          if (this.editdata.documentDetails != null) {
            for (let i = 0; i < this.editdata.documentDetails.length; i++) {
              
              this.addDetailsItem();
            }           
          }
          this.productform.setValue({
            id: this.editdata.id,
            issueDate: this.editdata.issueDate,
            clientId: this.editdata.clientId,
            patientId: this.editdata.patientId,
            documentDetails:this.editdata.documentDetails
          })

          
        });
        
      }else{
       
        this.addDetailsItem();
      
        
      }

      }
      getAllDocument(data: Documents){
        this.documentsService.getAll().subscribe((data: Documents[])=>{
        this.documents=data;
      })
    }

      onGlobalFilter(table: Table, event: Event) {
          table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
      }

      

      addOrUpdateDetails(){
      this.submitted = true;
      this.submitted = true;
           
              Object.assign(this.document, this.productform.value);
              console.log(this.document)
              if(this.document.id){
                this.documentsService.update(this.document.id, this.document).subscribe(res => {
                this.router.navigate(['documents/list']);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Apply updated', life: 3000 });
                 
                })
              }
              else{                
                this.documentsService.create(this.document).subscribe(res => {
                  this.router.navigate(['documents/list']);
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Agreement Added', life: 3000 });
                })
              }
            this.documents = [...this.documents]
            this.document={};
        }


    

  //  Detials Table
  

get documentDetails(){

      
      
  return this.productform.controls['documentDetails'] as FormArray;

  
}

addDetailsItem():void{
  this.formvariant = this.productform.get("documentDetails") as FormArray;
  this.formvariant.push(this.GenerateRow());
  //this.formvariant.value.url.append(this.response.dbPath)
  
}
removeAtDetails(index:number):void{
  return this.documentDetails.removeAt(index)
}



GenerateRow() {
return this.fb.group({
  id:this.fb.control(''),
  documentMasterId:this.fb.control(''),
  documentNo: this.fb.control(''),
  documentTitle: this.fb.control(''),
  documentType: this.fb.control(''),
  documentSize: this.fb.control(''),
  extension: this.fb.control(''),
  url:this.fb.control(''),
  

});

}

 



//product form
  productform=this.fb.group({
      id: this.fb.control(''),
      issueDate: this.fb.control(''),
      clientId: this.fb.control(''),
      patientId: this.fb.control(''),
      documentDetails: this.fb.array([])

  })
 //get from   
 get f(){
  return this.productform.controls;
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




  }
