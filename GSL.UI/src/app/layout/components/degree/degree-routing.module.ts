import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([

        { path: 'list', data: { breadcrumb: 'degree' }, loadChildren: () => import('./list/degree.module').then(m => m.DegreeModule) },

    ])],
    exports: [RouterModule]
})
export class DegreeRoutingModule { }
