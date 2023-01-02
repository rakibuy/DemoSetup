import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'list', data: {breadcrumb: 'Year'}, loadChildren: () => import('./list/profilelist.module').then(m => m.ProfileListModule) },
    ])],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }
