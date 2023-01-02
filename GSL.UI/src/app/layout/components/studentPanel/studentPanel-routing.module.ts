import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([

        { path: 'list', data: { breadcrumb: 'list' }, loadChildren: () => import('./list/studentPanel.module').then(m => m.StudentPanelModule) },
        { path: 'addoredit', data: { breadcrumb: 'addoredit' }, loadChildren: () => import('./addoredit/addoredit.module').then(m => m.AddoreditModule) },
        { path: ':registerId', data: { breadcrumb: 'addoredit' }, loadChildren: () => import('./index/index.module').then(m => m.IndexModule) },

    ])],
    exports: [RouterModule]
})
export class StudentPanelRoutingModule { }
