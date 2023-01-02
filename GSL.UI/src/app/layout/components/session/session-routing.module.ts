import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([

        { path: 'list', data: { breadcrumb: 'session' }, loadChildren: () => import('./list/session.module').then(m => m.SessionModule) },

    ])],
    exports: [RouterModule]
})
export class SessionRoutingModule { }
