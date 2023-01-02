import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([

        { path: 'list', data: { breadcrumb: 'list' }, loadChildren: () => import('./list/apply.module').then(m => m.ApplyModule) },
        { path: 'addoredit', data: { breadcrumb: 'addoredit' }, loadChildren: () => import('./addoredit/addoredit.module').then(m => m.AddoreditModule) },
        { path: ':applyId', data: { breadcrumb: 'View' }, loadChildren: () => import('./addoredit/addoredit.module').then(m => m.AddoreditModule) },

    ])],
    exports: [RouterModule]
})
export class ApplyRoutingModule { }
