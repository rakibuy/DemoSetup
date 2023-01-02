import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PersonalInformationComponent } from './personalInformation.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: PersonalInformationComponent }
	])],
	exports: [RouterModule]
})
export class PersonalInformationRoutingModule { } 
