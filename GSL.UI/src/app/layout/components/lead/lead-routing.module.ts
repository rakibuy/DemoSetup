import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([

        { path: 'list', data: { breadcrumb: 'list' }, loadChildren: () => import('./list/lead.module').then(m => m.LeadModule) },

    ])],
    exports: [RouterModule]
})
export class LeadRoutingModule { }
