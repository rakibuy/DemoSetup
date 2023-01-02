import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([

        { path: 'list', data: { breadcrumb: 'exam' }, loadChildren: () => import('./list/exam.module').then(m => m.ExamModule) },

    ])],
    exports: [RouterModule]
})
export class  ExamRoutingModule { }
