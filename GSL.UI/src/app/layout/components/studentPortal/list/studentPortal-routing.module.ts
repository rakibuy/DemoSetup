import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentPortalComponent } from './studentPortal.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: StudentPortalComponent }
	])],
	exports: [RouterModule]
})
export class StudentPortalRoutingModule { } 
