import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([

        { path: 'receive', data: { breadcrumb: 'Receive' }, loadChildren: () => import('./receive/receive.module').then(m => m.ReceiveModule) },
        { path: 'expence', data: { breadcrumb: 'Expense' }, loadChildren: () => import('./expence/expence.module').then(m => m.ExpenseModule) },
        
        

    ])],
    exports: [RouterModule]
})
export class PaymentReportRoutingModule { }
