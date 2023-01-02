import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {  StafListComponent } from './stafList.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: StafListComponent }
	])],
	exports: [RouterModule]
})
export class StafListRoutingModule { } 
