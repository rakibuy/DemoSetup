import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentPanelComponent } from './studentPanel.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: StudentPanelComponent }
	])],
	exports: [RouterModule]
})
export class StudentPanelRoutingModule { } 
