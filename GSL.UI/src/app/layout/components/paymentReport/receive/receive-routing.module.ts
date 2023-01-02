import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReceiveComponent } from './receive.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ReceiveComponent }
	])],
	exports: [RouterModule]
})
export class ReceiveRoutingModule { } 
