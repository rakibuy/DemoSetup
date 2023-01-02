import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CouncilorAssignJobComponent } from './councilorAssignJob.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CouncilorAssignJobComponent }
	])],
	exports: [RouterModule]
})
export class CouncilorAssignJobRoutingModule { } 
