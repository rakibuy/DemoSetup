import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([

        { path: 'list', data: { breadcrumb: 'list' }, loadChildren: () => import('./list/expense.module').then(m => m.ExpenseModule) },
        { path: 'addoredit', data: { breadcrumb: 'addoredit' }, loadChildren: () => import('./addoredit/addoredit.module').then(m => m.AddoreditModule) },
        { path: 'pending', data: { breadcrumb: 'pending' }, loadChildren: () => import('./pending/pending.module').then(m => m.PendingModule) },
        { path: ':applyId', data: { breadcrumb: 'View' }, loadChildren: () => import('./addoredit/addoredit.module').then(m => m.AddoreditModule) },
        { path: 'pdf-generator', data: { breadcrumb: 'Pdf' }, loadChildren: () => import('./pdfGenerator/pdfGenerator.module').then(m => m.PdfGeneratorModule) },
    ])],
    exports: [RouterModule]
})
export class ExpenseRoutingModule { }
