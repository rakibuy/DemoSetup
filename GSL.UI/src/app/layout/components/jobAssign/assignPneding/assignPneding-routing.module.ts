import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AssignPnedingComponent } from './assignPneding.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AssignPnedingComponent }
	])],
	exports: [RouterModule]
})
export class AssignPnedingRoutingModule { } 
