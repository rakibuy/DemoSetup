import {Component, OnInit} from '@angular/core';
import { FormArray, FormArrayName, FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Year } from 'src/app/layout/api/year';
import { YearService } from 'src/app/layout/service/year.service';


@Component({
    templateUrl: './purchase.component.html',
    providers: [MessageService, ConfirmationService]
})
export class PurchaseComponent implements OnInit {
    puchaseForm!:FormGroup;
    years: Year[] = [];
  year: Year = {
    };
    
    yearDialog: boolean = false;

    deleteYearDialog: boolean = false;

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];
    product!: {};
    

    puchaseDialog: boolean = false;
    
    
    constructor(
        private fb:FormBuilder,
        public yearService:YearService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.initPurchesForm();
        
    }
convertToGroup(itemGroup: any){
    return itemGroup as FormGroup;
}
addPurchaseItem():void{
    const group = this.fb.group({
        category:(''),
        university:(''),
        unit:(''),
        batchNo:(''),
        amount:(''),
        subtotal:('')

    })
    this.items.push(group)
}
removeAtPurchase(index:number):void{
   return this.items.removeAt(index)
}
get items(){
    return this.puchaseForm.controls['items'] as FormArray;
}
   private initPurchesForm():void{
    this.puchaseForm=this.fb.group({
        purchaseNo:(''),
        purchaseDate:(''),
        suplaier:(''),
        note:(''),
        items:this.fb.array([]),
        paymentType:(''),
        subtotal:('')
    })
   
    
    this.addPurchaseItem();
   }
   submit(){
    this.yearService.create(this.puchaseForm.value).subscribe((res:any) => {
        
   })


}

 openNew(){
    this.puchaseDialog = true;
 }

 hideDialog() {
    this.puchaseDialog = false;
    
}
   
    
}
