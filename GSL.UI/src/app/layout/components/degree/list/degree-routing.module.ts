import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DegreeComponent } from './degree.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DegreeComponent }
	])],
	exports: [RouterModule]
})
export class DegreeRoutingModule { } 
