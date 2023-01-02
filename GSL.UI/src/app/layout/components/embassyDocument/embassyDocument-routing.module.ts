import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([

        { path: 'list', data: { breadcrumb: 'EmbassyDocument' }, loadChildren: () => import('./list/embassyDocument.module').then(m => m.EmbassyDocumentModule) },

    ])],
    exports: [RouterModule]
})
export class EmbassyDocumentRoutingModule { }
