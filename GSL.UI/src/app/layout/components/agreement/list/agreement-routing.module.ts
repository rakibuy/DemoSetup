import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgreementComponent } from './agreement.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AgreementComponent }
	])],
	exports: [RouterModule]
})
export class AgreementRoutingModule { }
