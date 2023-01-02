import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProfileListComponent } from './profilelist.component';
import { ProfileListRoutingModule } from './profilelist-routing.module';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
	imports: [
		CommonModule,
		ProfileListRoutingModule,
		RippleModule,
		ButtonModule,
		InputTextModule,
		TableModule,
		ProgressBarModule,
		ToastModule,
		ToolbarModule,
		FileUploadModule,
		DialogModule,
		FormsModule,
		
		ReactiveFormsModule, 
		RatingModule, 
		
		InputTextareaModule,
		DropdownModule,
		RadioButtonModule,
		InputNumberModule,

	],
	declarations: [ProfileListComponent]
})
export class ProfileListModule { }
