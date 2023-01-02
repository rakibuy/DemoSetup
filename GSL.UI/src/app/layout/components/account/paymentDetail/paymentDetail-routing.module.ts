import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaymentDetailComponent } from './paymentDetail.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: PaymentDetailComponent }
	])],
	exports: [RouterModule]
})
export class PaymentDetailRoutingModule { } 
