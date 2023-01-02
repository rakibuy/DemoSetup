import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversityComponent } from './university.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: UniversityComponent }
	])],
	exports: [RouterModule]
})
export class UniversityRoutingModule { } 
