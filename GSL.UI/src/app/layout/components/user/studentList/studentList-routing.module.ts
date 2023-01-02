import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {  StudentListComponent } from './studentList.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: StudentListComponent }
	])],
	exports: [RouterModule]
})
export class StudentListRoutingModule { } 
