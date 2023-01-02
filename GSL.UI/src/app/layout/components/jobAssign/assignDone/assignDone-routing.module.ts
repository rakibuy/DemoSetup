import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AssignDoneComponent } from './assignDone.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AssignDoneComponent }
	])],
	exports: [RouterModule]
})
export class AssignDoneRoutingModule { } 
