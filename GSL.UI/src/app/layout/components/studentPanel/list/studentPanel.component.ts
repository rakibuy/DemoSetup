import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Session } from 'src/app/layout/api/session';
import { SessionService } from 'src/app/layout/service/session.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonalInformation } from 'src/app/layout/api/PersonalInformation';
import { PersonalInformationService } from 'src/app/layout/service/PersonalInformationService';
import { Qualification } from 'src/app/layout/api/qualification';
import { QualificationService } from 'src/app/layout/service/qualification.service';
import { PassportDetail } from 'src/app/layout/api/passportDetail';
import { PassportDetailService } from 'src/app/layout/service/passportDetail.service';
import { DatePipe } from '@angular/common';
import { Register } from 'src/app/layout/api/register';
import { RegisterService } from 'src/app/layout/service/register.service';
import { CountryService } from 'src/app/layout/service/country.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './studentPanel.component.html',
    providers: [MessageService, ConfirmationService]
})
export class StudentPanelComponent implements OnInit {

  form!: FormGroup;
  registers: Register[] = [];
  register: Register = {
     
    };


    countries: any[] = [];
    filteredCountries: any[] = [];
    selectedCountryAdvanced: any[] = [];

//common
    product!: {};
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    

    constructor(
      private messageService: MessageService, 
      private confirmationService: ConfirmationService,
      public registerService: RegisterService,
      private countryService: CountryService,
      private router:Router
     
      ) { }

    ngOnInit(): void {
      this.getAllRegister(this.register);

      this.form = new FormGroup({
        


      });
      this.countryService.getCountries().then(countries => {
        this.countries = countries;
    });
      
   
    }

    getAllRegister(register: Register){
      this.registerService.getAll().subscribe((data: Register[])=>{
      this.registers=data;
    })
  }
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
  

addRegisterData(){
  this.router.navigate(['/register/addoredit/']);
}
 

  

    
    

    
}

