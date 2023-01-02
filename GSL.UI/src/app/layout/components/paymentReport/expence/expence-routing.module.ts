import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExpenceComponent } from './expence.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ExpenceComponent }
	])],
	exports: [RouterModule]
})
export class ExpenceRoutingModule { } 
