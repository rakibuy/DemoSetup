import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfilePdfComponent } from './profilePdf.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: ':id', component: ProfilePdfComponent }
	])],
	exports: [RouterModule]
})
export class ProfilePdfRoutingModule { } 
