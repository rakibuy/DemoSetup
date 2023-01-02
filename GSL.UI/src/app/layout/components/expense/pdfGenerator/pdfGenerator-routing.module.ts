import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PdfGeneratorComponent } from './pdfGenerator.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: ':paymentId', component: PdfGeneratorComponent }
	])],
	exports: [RouterModule]
})
export class PdfGeneratorRoutingModule { } 
