import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {  CouncilorListComponent } from './councilorList.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CouncilorListComponent }
	])],
	exports: [RouterModule]
})
export class CouncilorListRoutingModule { } 
