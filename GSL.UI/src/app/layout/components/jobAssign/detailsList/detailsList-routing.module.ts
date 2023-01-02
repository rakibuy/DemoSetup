import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetailsListComponent } from './detailsList.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: ':assignToId', component: DetailsListComponent }
	])],
	exports: [RouterModule]
})
export class DetailsListRoutingModule { } 
