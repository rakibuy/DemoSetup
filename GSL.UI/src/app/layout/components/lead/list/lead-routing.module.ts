import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LeadComponent } from './lead.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: LeadComponent }
	])],
	exports: [RouterModule]
})
export class LeadRoutingModule { }
