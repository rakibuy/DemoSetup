import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {  VisitorListComponent } from './visitorList.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: VisitorListComponent }
	])],
	exports: [RouterModule]
})
export class VisitorListRoutingModule { } 
