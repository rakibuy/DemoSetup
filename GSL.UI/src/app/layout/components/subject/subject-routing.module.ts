import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([

        { path: 'list', data: { breadcrumb: 'subject' }, loadChildren: () => import('./list/subject.module').then(m => m.SubjectModule) },

    ])],
    exports: [RouterModule]
})
export class SubjectRoutingModule { }
