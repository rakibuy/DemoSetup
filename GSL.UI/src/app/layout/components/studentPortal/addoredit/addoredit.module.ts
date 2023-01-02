import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AddoreditRoutingModule } from './addoredit-routing.module';
import { AddoreditComponent } from './addoredit.component';
import { TabViewModule } from 'primeng/tabview';
import {ButtonModule} from 'primeng/button';
import { FormsModule } from '@angular/forms';





import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";




import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';






import { ChipModule } from "primeng/chip";

import { RatingModule } from 'primeng/rating';
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SliderModule } from 'primeng/slider';
 
//fileUpload

import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';

import {TreeSelectModule} from 'primeng/treeselect';


@NgModule({
	imports: [

		CommonModule,
		AddoreditRoutingModule,
		TabViewModule,
		ButtonModule,
		FormsModule,

		FileUploadModule,
		HttpClientModule,
		ReactiveFormsModule,
		ToastModule,
		ChipModule,
		RatingModule,
		KnobModule,
		ListboxModule,
		SelectButtonModule,
		CheckboxModule,
		InputSwitchModule,
		RadioButtonModule,
		ColorPickerModule,
		ToggleButtonModule,
		SliderModule,

		TabViewModule,
		ButtonModule,
		FormsModule,
		AutoCompleteModule,
		CalendarModule,
		ChipsModule,
		DropdownModule,
		InputMaskModule,
		InputNumberModule,
		CascadeSelectModule,
		MultiSelectModule,
		InputTextareaModule,
		InputTextModule,
		TableModule,
		RippleModule,
		ToolbarModule,
		DialogModule,
		TreeSelectModule

	],
	declarations: [AddoreditComponent],
	providers:[DatePipe]
})
export class AddoreditModule { }
