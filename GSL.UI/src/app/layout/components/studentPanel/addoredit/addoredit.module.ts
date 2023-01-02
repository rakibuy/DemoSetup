import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddoreditRoutingModule } from './addoredit-routing.module';
import { AddoreditComponent } from './addoredit.component';
import { TabViewModule } from 'primeng/tabview';
import {ButtonModule} from 'primeng/button';

@NgModule({
	imports: [
		CommonModule,
		AddoreditRoutingModule,
		TabViewModule,
		ButtonModule
	],
	declarations: [AddoreditComponent]
})
export class AddoreditModule { }
