import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JobAssignComponent } from './jobAssign.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: JobAssignComponent }
	])],
	exports: [RouterModule]
})
export class JobAssignRoutingModule { } 
