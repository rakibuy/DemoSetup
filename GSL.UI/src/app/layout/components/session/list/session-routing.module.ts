import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SessionComponent } from './session.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: SessionComponent }
	])],
	exports: [RouterModule]
})
export class SessionRoutingModule { } 
