import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmbassyDocumentComponent } from './embassyDocument.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EmbassyDocumentComponent }
	])],
	exports: [RouterModule]
})
export class EmbassyDocumentRoutingModule { } 
