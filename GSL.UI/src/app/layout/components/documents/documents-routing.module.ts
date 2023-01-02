import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([

        { path: 'list', data: { breadcrumb: 'list' }, loadChildren: () => import('./list/documents.module').then(m => m.DocumentsModule) },
      
        { path: 'addoredit', data: { breadcrumb: 'addoredit' }, loadChildren: () => import('./addoredit/addoredit.module').then(m => m.AddoreditModule) },
        { path: ':documentId', data: { breadcrumb: 'View' }, loadChildren: () => import('./addoredit/addoredit.module').then(m => m.AddoreditModule) },

    ])],
    exports: [RouterModule]
})
export class DocumentsRoutingModule { }
