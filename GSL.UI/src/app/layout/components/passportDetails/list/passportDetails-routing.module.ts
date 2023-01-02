import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PassportDetailsComponent } from './passportDetails.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: PassportDetailsComponent }
	])],
	exports: [RouterModule]
})
export class PassportDetailsRoutingModule { } 
