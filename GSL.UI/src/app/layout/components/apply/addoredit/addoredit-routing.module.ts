import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddoreditComponent } from './addoredit.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AddoreditComponent }
	])],
	exports: [RouterModule]
})
export class AddoreditRoutingModule { }
