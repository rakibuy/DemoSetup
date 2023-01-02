import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StafAssignJobComponent } from './stafAssignJob.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: StafAssignJobComponent }
	])],
	exports: [RouterModule]
})
export class StafAssignJobRoutingModule { } 
