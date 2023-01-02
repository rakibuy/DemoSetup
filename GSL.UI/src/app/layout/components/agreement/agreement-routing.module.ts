import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([

        { path: 'list', data: { breadcrumb: 'agreement' }, loadChildren: () => import('./list/agreement.module').then(m => m.AgreementModule) },

    ])],
    exports: [RouterModule]
})
export class AgreementRoutingModule { }
