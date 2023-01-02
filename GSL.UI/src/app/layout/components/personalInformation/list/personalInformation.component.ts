import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonalInformation } from 'src/app/layout/api/PersonalInformation';
import { PersonalInformationService } from 'src/app/layout/service/PersonalInformationService';

@Component({
    templateUrl: './PersonalInformation.component.html',
    providers: [MessageService, ConfirmationService]
})
export class PersonalInformationComponent implements OnInit {
  form!: FormGroup;
  informations: PersonalInformation[] = [];
  information: PersonalInformation = {
  // id: 0,
  // registrationId: "dd",
  // firstName: "",
  // middleName: "",
  // lastName: "",
  // nickname: "",
  // fatherName: "",
  // motherName: "",
  // birthDate: "2022-08-21",
  // birthPlace: "",
  // spouseName: "",
  // son: 0,
  // daughter: 0,
  // tin: "",
  // passportNo: "",
  // drivingLicense: "",
  // nid: "",
  // extraCurricularActivities: "",
  // remark: "",
  // genderId: "",
  // nationalityId: "",
  // religionId: "",
  // bloodGroupId: "",
  // maritalStatusId: ""
    };

    selectedGender: any=null;

    dropdownGender = [
      { name: 'Select List', code: 'Null' },
      { name: 'Mail', code: 'Mail ' },
      { name: 'Femail ', code: 'Femail' },
      { name: 'Others', code: 'Others' },
        
    ];
    selectedMarital: any = null;

    dropdownMarital = [
      { name: 'Select List', code: 'Null' },
      { name: 'Married', code: 'Married ' },
      { name: 'Widowed ', code: 'Widowed ' },
      { name: 'Separated', code: 'Separated' },
      { name: 'Divorced ', code: 'Divorced ' },
      { name: 'Single', code: 'Single' }
    ];

    selectedBlood: any = null;

    dropdownBlood = [
      { name: 'Select List', code: 'Null' },
      { name: 'A+', code: 'A+' },
      { name: 'A- ', code: 'A- ' },
      { name: 'B+', code: 'B-' },
      { name: ' AB+', code: 'AB+' },
      { name: 'AB-', code: 'AB-' },
      { name: 'O+', code: 'O+' },
        { name: 'O-', code: 'O-' },
        { name: 'O-', code: 'O-' }
    ];

    selectedReligion: any = null;

    dropdownReligion = [
      { name: 'Select List', code: 'Null' },
      { name: 'Atheism', code: 'Atheism' },
      { name: 'Buddhism', code: 'Buddhism' },
        { name: 'Christianity', code: 'Christianity' },
        { name: 'Confucianism', code: 'Confucianism' },
        { name: 'Hinduism', code: 'Hinduism' },
        { name: 'Islam', code: 'Islam' },
        { name: 'Jainism', code: 'Jainism' },
        { name: 'Sikhism', code: 'Sikhism' }
    ];

    informationDialog: boolean = false;

    deleteInformationDialog: boolean = false;

    submitted: boolean = false;

    cols: any[] = [];
     

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];
    product!: {};

    constructor(private messageService: MessageService,
       private confirmationService: ConfirmationService,
      public informationService: PersonalInformationService) { }

    ngOnInit(): void {
      this.getAllInformation(this.information);
      this.form = new FormGroup({
        
        registrationId: new FormControl('',[Validators.required]),
        firstName:new FormControl('', [Validators.required]),
        middleName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        nickname: new FormControl('', [Validators.required]),
        fatherName: new FormControl('', [Validators.required]),
        motherName: new FormControl('', [Validators.required]),
        birthDate: new FormControl('', [Validators.required]),
        birthPlace: new FormControl('', [Validators.required]),
        spouseName: new FormControl('', [Validators.required]),
        son: new FormControl('', [Validators.required,Validators.pattern('[0-9]')]),
        daughter: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
        tin: new FormControl('', [Validators.required]),
        passportNo: new FormControl('', [Validators.required]),
        drivingLicense: new FormControl('', [Validators.required]),
        nid:new FormControl('', [Validators.required]),
        extraCurricularActivities: new FormControl('', [Validators.required]),
        remark:new FormControl('', [Validators.required]),
        genderId: new FormControl('', [Validators.required]),
        nationalityId: new FormControl('', [Validators.required]),
        religionId: new FormControl('', [Validators.required]),
        bloodGroupId: new FormControl('', [Validators.required]),
        maritalStatusId: new FormControl('', [Validators.required]),


      });
    }
    
    getAllInformation(information: PersonalInformation){
      this.informationService.getAll().subscribe((data: PersonalInformation[])=>{
      this.informations=data;
      
    })
  }

  get f(){
    return this.form.controls;
  }

  deleteInformation(information: PersonalInformation) {
      this.deleteInformationDialog = true;
      this.information = { ...information };
  }


    openNew() {
        this.product = {};
        this.submitted = false;
        this.informationDialog = true;
        this.information= {
      
            };
    }
    editInformation(information: PersonalInformation) {
      
      this.information = { ...information };
      this.informationDialog = true;
    }

    confirmDelete() {
        this.deleteInformationDialog = false;
        this.informationService.delete(this.information.id).subscribe(res => {
          this.informations = this.informations.filter(item => item.id !== this.information.id);
        })
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Personal Information Deleted', life: 3000 });
        this.product = {};
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    hideDialog() {
      this.informationDialog = false;
      this.submitted = false;
  }

  addOrUpdateInformation(){
    this.submitted = true;
    
    
          if(this.information.id){
            
            this.informationService.update(this.information.id, this.information).subscribe(res => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Personal Information updated', life: 3000 });
              this.getAllInformation(this.information);
            })
          }
          else{
          
            this.informationService.create(this.information).subscribe(res => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Personal Information Added', life: 3000 });
              this.getAllInformation(this.information);
            })
          }
        this.informations = [...this.informations]
        this.informationDialog = false;
        this.product = {};
  }
}

