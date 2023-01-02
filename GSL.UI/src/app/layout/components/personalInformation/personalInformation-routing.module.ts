import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([

        { path: 'list', data: { breadcrumb: 'personalInformation' }, loadChildren: () => import('./list/personalInformation.module').then(m => m.PersonalInformationModule) },

    ])],
    exports: [RouterModule]
})
export class PersonalInformationRoutingModule { }
