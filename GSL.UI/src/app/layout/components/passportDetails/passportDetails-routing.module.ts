import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([

        { path: 'list', data: { breadcrumb: 'passportDetails' }, loadChildren: () => import('./list/passportDetails.module').then(m => m.PassportDetailsModule) },

    ])],
    exports: [RouterModule]
})
export class PassportDetailsRoutingModule { }
