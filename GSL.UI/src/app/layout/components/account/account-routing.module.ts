import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([

        { path: 'payment', data: { breadcrumb: 'Account' }, loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule) },
        { path: 'payment/detail', data: { breadcrumb: 'Account' }, loadChildren: () => import('./paymentDetail/paymentDetail.module').then(m => m.PaymentDetailModule) },

    ])],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
