import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { FormControl, FormGroup } from '@angular/forms';
import { CountryService } from 'src/app/layout/service/country.service';
import { Register } from 'src/app/layout/api/register';
import { RegisterService } from 'src/app/layout/service/register.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './register.component.html',
    providers: [MessageService, ConfirmationService], 
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  registers: Register[] = [];
  register: Register = {
     
    };

    selectedGender: any = null;

    dropdownGender = [
      { name: 'Select List', code: 'Null' },
      { name: 'Male', code: 'Male ' },
      { name: 'Female ', code: 'Female' },
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

    selectedFounding: any = null;

    dropdownFounding = [
      { name: 'Select List', code: 'Null' },
      { name: 'Yes', code: 'Yes ' },
      { name: 'No ', code: 'No ' },
    ];
    registerDialog: boolean = false;
    countries: any[] = [];
    filteredCountries: any[] = [];
    selectedCountryAdvanced: any[] = [];
    

    deleteRegisterDialog: boolean = false;

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];
    
    valSwitch: boolean = false;

    

    rowsPerPageOptions = [5, 10, 20];
    product!: {};

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


  deleteRegister(register: Register) {
      this.deleteRegisterDialog = true;
      this.register = { ...register };
  }


    openNew() {
        this.product = {};
        this.submitted = false;
        this.registerDialog = true;
    }
    editRegister(register: Register) {
     
      this.register = { ...register };
      this.registerDialog = true;
    }

    confirmDelete() {
        this.deleteRegisterDialog = false;
        this.registerService.delete(this.register.id).subscribe(res => {
          this.registers = this.registers.filter(item => item.id !== this.register.id);
        })
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Register Deleted', life: 3000 });
        this.product = {};
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    hideDialog() {
      this.registerDialog = false;
      this.submitted = false;
  }

  addOrUpdateRegister(){
    this.submitted = true;

          if(this.register.id){
            this.registerService.update(this.register.id, this.register).subscribe(res => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Register updated', life: 3000 });
              this.getAllRegister(this.register);
            })
          }
          else{
            this.registerService.create(this.register).subscribe(res => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Register Added', life: 3000 });
              this.getAllRegister(this.register);
            })
          }
        this.registers = [...this.registers]
        this.registerDialog = false;
        this.product = {};
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

