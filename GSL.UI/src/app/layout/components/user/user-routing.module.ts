import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([

        { path: 'list', data: { breadcrumb: 'List' }, loadChildren: () => import('./list/user.module').then(m => m.UserModule) },
        { path: 'student-list', data: { breadcrumb: 'Student' }, loadChildren: () => import('./studentList/studentList.module').then(m => m.StudentListModule) },
        { path: 'staf-list', data: { breadcrumb: 'Staff' }, loadChildren: () => import('./stafList/stafList.module').then(m => m.StafListModule) },
        { path: 'account-list', data: { breadcrumb: 'Account' }, loadChildren: () => import('./accountList/accountList.module').then(m => m.AccountListModule) },
        { path: 'visitor-list', data: { breadcrumb: 'Visitor' }, loadChildren: () => import('./visitorList/visitorList.module').then(m => m.VisitorListModule) },
        { path: 'councilor-list', data: { breadcrumb: 'Councilor' }, loadChildren: () => import('./councilorList/councilorList.module').then(m => m.CouncilorListModule) },
        //{ path: 'addoredit', data: { breadcrumb: 'addoredit' }, loadChildren: () => import('./addoredit/addoredit.module').then(m => m.AddoreditModule) },
        //{ path: ':routeId', data: { breadcrumb: 'View' }, loadChildren: () => import('./addoredit/addoredit.module').then(m => m.AddoreditModule) },


    ])],
    exports: [RouterModule]
})
export class  UserRoutingModule { }
