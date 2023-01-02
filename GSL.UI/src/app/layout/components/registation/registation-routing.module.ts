import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([

        { path: 'list', data: { breadcrumb: 'List' }, loadChildren: () => import('./list/registation.module').then(m => m.RegistationModule) },
        


    ])],
    exports: [RouterModule]
})
export class  RegistationRoutingModule { }
