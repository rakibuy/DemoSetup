import { DatePipe } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { interval, timestamp } from 'rxjs';
import { Register } from 'src/app/layout/api/register';
import { Score } from 'src/app/layout/api/score';
import { CountryService } from 'src/app/layout/service/country.service';
import { RegisterService } from 'src/app/layout/service/register.service';
import { SubjectService } from 'src/app/layout/service/subject.service';
import { __values } from 'tslib';


@Component({
    templateUrl: './addoredit.component.html',
    providers: [MessageService, ConfirmationService]
})

export class AddoreditComponent implements OnInit {

    //from
    formvariant! : FormArray<any>
    editdata:any;
    
    
  //register
    register:Register={}

    score:Score={
      id: "",
      registrationId: "", 
      scoreName: "",
      overallScore: 0,
      listening: 0,
      reading: 0,
      writing: 0,
      speaking: 0,
      refusedCountry: ""

}
 
    id!:string;
    //common
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    product!: {};

    //dropdown
    subjectData:any;
    country:any;
    degreeNames: SelectItem[] = [];
    degreeNamesdata: [] = [];
    selectedList: SelectItem = { value: '' };
    selectedDrop: SelectItem = { value: '' };
    countries:any;

    //constructor
    constructor(
        private fb:FormBuilder,
        private messageService: MessageService,
        public registerService: RegisterService,
        private router: Router, 
        private route:ActivatedRoute,
        private subjectService:SubjectService,
        public datePipe:DatePipe,
        private countryService:CountryService
       ) {}

    ngOnInit(): void {
      
      
         //dropdown
         this.subjectService.getAll().subscribe(item => {
          
          this.subjectData = item;
        });

        this.countryService.getCountries().then(countries => {
          this.countries = countries;
      });

 
        //route selected
        this.id= this.route.snapshot.params['registerId'];
        
        if(this.id != undefined){
          

        //qualification and score table valu set
        this.registerService.find(this.id).subscribe((data: any)=>{
          let dDate =this.datePipe.transform(data.dob,'yyyy-MM-dd');
          this.editdata = data;
          this.editdata.dob=dDate;
          
          
          if (this.editdata.academicQualifications != null) {
            for (let i = 0; i < this.editdata.academicQualifications.length; i++) {

             
              this.addQualificationItem();
              
            }
          }
          
          
          if (this.editdata.scores != null) {
            for (let i = 0; i < this.editdata.scores.length; i++) {

              this.addEinglishItem();
              
            }
          }

          this.productform.setValue({
            id: this.editdata.id,
            firstName: this.editdata.firstName,
            dob: this.editdata.dob,
            mobile: this.editdata.mobile,
            email: this.editdata.email,
            preferenceCountryId: this.editdata.preferenceCountryId,
            lastUniversity:this.editdata.lastUniversity,
            academicQualifications: this.editdata.academicQualifications,
            scores:this.editdata.scores
          })

          
        });
        
      }else{
       
        this.addQualificationItem();
        this.addEinglishItem();
      }

    }
    

//qualification
addQualificationItem(){
    
    this.formvariant = this.productform.get("academicQualifications") as FormArray;
    this.academicQualifications.push(this.GenerateQualificationrow())
}

GenerateQualificationrow() {
    return this.fb.group({
      id:this.fb.control(''),
      registrationId:this.fb.control(''),
      degreeName: this.fb.control('',[Validators.required]),
      subjectName: this.fb.control('',[Validators.required]),
      result: this.fb.control('',
        [Validators.required,
        Validators.pattern("^[0-9.]{1,4}$"),
      ]),
      passingYear: this.fb.control('',[Validators.required, Validators.pattern("^[0-9-]{4,10}$")]),
    });
  }
removeAtQualification(index:number):void{
   return this.academicQualifications.removeAt(index)
}

get academicQualifications(){
    return this.productform.controls['academicQualifications'] as FormArray;

}




//score table
get scores(){
    return this.productform.controls['scores'] as FormArray;
    
}

addEinglishItem():void{
   this.formvariant = this.productform.get("scores") as FormArray;
  this.formvariant.push(this.GeneraterowScors());
}

GeneraterowScors() {
  return this.fb.group({
    id:this.fb.control(''),
    registrationId:this.fb.control(''),
    scoreName: this.fb.control(''),
    overallScore: this.fb.control(0),
    listening: this.fb.control(0),
    reading: this.fb.control(0),
    writing: this.fb.control(0),
    speaking: this.fb.control(0),
    refusedCountry: this.fb.control(''),

  });
}
removeAtEinglishPurchase(index:number):void{
    return this.scores.removeAt(index)
 }


//product form
    productform=this.fb.group({
        id: this.fb.control(''),
        firstName: this.fb.control('', Validators.required),
        dob: this.fb.control('', Validators.required),
        mobile: this.fb.control('', [Validators.required,Validators.pattern("^[0-9]{10,15}$")]),
        email: this.fb.control('', [Validators.required,Validators.email]),
        preferenceCountryId: this.fb.control(''),
        lastUniversity: this.fb.control(''),
        academicQualifications: this.fb.array([]),
        scores: this.fb.array([])

    })
   
 //get from   
get f(){
    return this.productform.controls;
}

//add and update
addOrUpdateRegistation(){
    
    this.submitted = true;
        
      //marge mastar table and detials table
      Object.assign(this.register, this.productform.value);
      console.log(this.register)

          if(this.register.id){
           
            this.registerService.update(this.register.id, this.register).subscribe(res => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Registration updated', life: 3000 });
              // interval(2000).subscribe((d)=>{
              //   this.router.navigate(['register/list']);
              //  })
             
              
            })
          }
          else{ 
           
            this.registerService.create(this.register).subscribe(res => {

              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Registration Add', life: 3000 });
             
              // interval(2000).subscribe((d)=>{
              //   this.router.navigate(['register/list']);
              //  })
              
            })
          }
  }
 
}
