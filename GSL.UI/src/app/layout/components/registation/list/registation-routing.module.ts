import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {  RegistationComponent } from './registation.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: RegistationComponent }
	])],
	exports: [RouterModule]
})
export class RegistationRoutingModule { } 
