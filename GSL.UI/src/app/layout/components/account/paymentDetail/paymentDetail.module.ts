import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentDetailRoutingModule } from './paymentDetail-routing.module';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { PaymentDetailComponent } from './paymentDetail.component';
import { CalendarModule } from "primeng/calendar";

@NgModule({
	imports: [
		CommonModule,
		TableModule,
		FileUploadModule,
		FormsModule,
		ButtonModule,
		RippleModule,
		ToastModule,
		ToolbarModule,
		RatingModule, 
		InputTextModule,
		InputTextareaModule,
		DropdownModule,
		RadioButtonModule,
		InputNumberModule,
		DialogModule,
		CalendarModule,
		PaymentDetailRoutingModule
	],
	declarations: [PaymentDetailComponent]
})
export class PaymentDetailModule { }
