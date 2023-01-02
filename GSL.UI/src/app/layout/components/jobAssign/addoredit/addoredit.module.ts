import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AddoreditRoutingModule } from './addoredit-routing.module';
import { AddoreditComponent } from './addoredit.component';
import { TabViewModule } from 'primeng/tabview';
import {ButtonModule} from 'primeng/button';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
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
import { CalendarModule } from "primeng/calendar";
import { AutoCompleteModule } from "primeng/autocomplete";
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipsModule } from 'primeng/chips';
import { InputMaskModule } from 'primeng/inputmask';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SliderModule } from 'primeng/slider';
import { KnobModule } from 'primeng/knob';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';


import { SkeletonModule } from 'primeng/skeleton';



@NgModule({
	imports: [
		CommonModule,
		AddoreditRoutingModule,
		TabViewModule,
		ButtonModule,
		CommonModule,
		TableModule,
		FileUploadModule,
		FormsModule,
		RippleModule,
		ToastModule,
		ToolbarModule,
		MultiSelectModule,
		RatingModule, 
		InputTextModule,
		InputTextareaModule,
		DropdownModule,
		RadioButtonModule,
		InputNumberModule,
		DialogModule,
		CalendarModule,
		AutoCompleteModule,
		ReactiveFormsModule,
		ChipsModule,
		InputMaskModule,
		CascadeSelectModule,
		ToggleButtonModule,
		SliderModule,
		KnobModule,
		InputSwitchModule,
		SelectButtonModule,
		CheckboxModule,
		SkeletonModule
	],
	declarations: [AddoreditComponent],
	providers:[DatePipe]
})
export class AddoreditModule { }
