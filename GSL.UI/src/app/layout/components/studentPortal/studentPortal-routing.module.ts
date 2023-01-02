import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([

        { path: 'list', data: { breadcrumb: 'Profile' }, loadChildren: () => import('./list/studentPortal.module').then(m => m.StudentPortalModule) },
        { path: 'profile-pdf', data: { breadcrumb: 'Pdf' }, loadChildren: () => import('./profilePdf/profilePdf.module').then(m => m.ProfilePdfModule) },
        { path: ':routeId', data: { breadcrumb: 'Add Details' }, loadChildren: () => import('./addoredit/addoredit.module').then(m => m.AddoreditModule) },

    ])],
    exports: [RouterModule]
})
export class StudentPortalRoutingModule { }
