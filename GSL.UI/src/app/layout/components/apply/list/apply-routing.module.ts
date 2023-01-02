import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApplyComponent } from './apply.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ApplyComponent }
	])],
	exports: [RouterModule]
})
export class ApplyRoutingModule { } 
