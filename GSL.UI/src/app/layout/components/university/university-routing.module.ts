import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([

        { path: 'list', data: { breadcrumb: 'list' }, loadChildren: () => import('./list/university.module').then(m => m.UniversityModule) },

    ])],
    exports: [RouterModule]
})
export class UniversityRoutingModule { }
