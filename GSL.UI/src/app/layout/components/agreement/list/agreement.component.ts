import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryService } from 'src/app/layout/service/country.service';
import { Agreement } from 'src/app/layout/api/agreement';
import { AgreementService } from 'src/app/layout/service/agreement.service';
import { Country } from 'src/app/layout/api/countrie';
import { RegisterService } from 'src/app/layout/service/register.service';
import { DatePipe } from '@angular/common';
 interface City {
  name: string,
  code: string
}

@Component({
    templateUrl: './agreement.component.html',
    providers: [MessageService, ConfirmationService]
})
export class AgreementComponent implements OnInit {
  agreementForm!: FormGroup;
    agreements: Agreement[] = [];
    agreement: Agreement = {
    
      
    };


    //dropdown
    country:Country[]=[]
    countries: any[] = [];
    studenregistation:any;
    valu:any;
    filteredCountries: any[] = [];

    selectedCountryAdvanced: any[] = [];
    agreementDialog: boolean = false;

    deleteAgreementDialog: boolean = false;

    submitted: boolean = false;

    cols: any[] = [];
    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];
    product!: {};

   

    constructor(private messageService: MessageService, 
      private confirmationService: ConfirmationService,
      public agreementService: AgreementService,
      private countryService: CountryService,
      private registerService:RegisterService,
      private datePipe:DatePipe
      ) { }

    ngOnInit(): void {
      this.getAllAgreement(this.agreement);
      
      this.countryService.getCountries().then(countries => {
      this.countries = countries;
    });
    this.registerService.GetRegistrationWithoutAgreements().subscribe(data => {
      this.studenregistation=data;
     console.log(this.studenregistation)
    })

    }
    getAllAgreement(agreement: Agreement){
      this.agreementService.getAll().subscribe((data: Agreement[])=>{
      this.agreements=data;

      
      
      
    })
  }

  get f(){
    return this.agreementForm.controls;
  }

    deleteAgreement(agreement: Agreement) {
          this.deleteAgreementDialog = true;
          this.agreement = { ...agreement };
      }


  openNew(){
          this.product = {};
          this.submitted = false;
          this.agreementDialog = true;
          this.agreement = {};
      }
    editAgreement(agreement: Agreement) {

      let dDate = this.datePipe.transform(agreement.agreementDate,'YYYY-MM-dd')
      agreement.agreementDate=dDate;
      this.agreement = { ...agreement };
      
      this.agreementDialog = true;
    }

    confirmDelete() {
        this.deleteAgreementDialog = false;
        this.agreementService.delete(this.agreement.id).subscribe(res => {
          this.agreements = this.agreements.filter(item => item.id !== this.agreement.id);
        })
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Agreement Deleted', life: 3000 });
        this.product = {};
    }


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    hideDialog() {
      this.agreementDialog = false;
      this.submitted = false;
  }

  addOrUpdateAgreement(){
    this.submitted = true;
      
      if (
        this.agreement.registrationId?.trim() &&
        this.agreement.agreementDate?.trim() 
        // &&
        // this.agreement.beforVisaCost?.valueOf() &&
        // this.agreement.afterVisaServiceCharge?.valueOf() &&
        // this.agreement.registrationFees?.valueOf()&&
        // this.agreement.universityApplicationFees?.valueOf()
      )
      {
        
          if(this.agreement.id){
            this.agreementService.update(this.agreement.id, this.agreement).subscribe(res => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Agreement updated', life: 3000 });
              this.getAllAgreement(this.agreement);
              
            })
          }
          else{
            
            this.agreementService.create(this.agreement).subscribe(res => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Agreement Added', life: 3000 });
              this.getAllAgreement(this.agreement);
            })
          }
        this.agreements = [...this.agreements]
        this.agreementDialog = false;
        this.agreement={};
        this.product = {};
      }

          
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

