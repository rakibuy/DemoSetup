import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {  AccountListComponent } from './accountList.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AccountListComponent }
	])],
	exports: [RouterModule]
})
export class AccountListRoutingModule { } 
