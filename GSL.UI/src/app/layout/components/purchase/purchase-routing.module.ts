import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([

        { path: 'list', data: { breadcrumb: 'purchase' }, loadChildren: () => import('./list/purchase.module').then(m => m.PurchaseModule) },

    ])],
    exports: [RouterModule]
})
export class PurchaseRoutingModule { }
