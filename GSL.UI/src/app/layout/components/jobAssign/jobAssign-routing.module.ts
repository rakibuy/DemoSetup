import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([

        { path: 'list', data: { breadcrumb: 'list' }, loadChildren: () => import('./list/jobAssign.module').then(m => m.JobAssignModule) },
        { path: 'addoredit', data: { breadcrumb: 'addoredit' }, loadChildren: () => import('./addoredit/addoredit.module').then(m => m.AddoreditModule) },
        { path: 'assign-pending', data: { breadcrumb: 'View' }, loadChildren: () => import('./assignPneding/assignPneding.module').then(m => m.AssignPnedingModule) },
        { path: 'assign-done', data: { breadcrumb: 'View' }, loadChildren: () => import('./assignDone/assignDone.module').then(m => m.AssignDoneModule) },
        { path: 'details-list', data: { breadcrumb: 'details-list' }, loadChildren: () => import('./detailsList/detailsList.module').then(m => m.DetailsListModule) },
        { path: 'staf-assign-job', data: { breadcrumb: 'Staf Assign Job' }, loadChildren: () => import('./stafAssignJob/stafAssignJob.module').then(m => m.StafAssignJobModule) },
        { path: 'councilor-assign-job', data: { breadcrumb: 'Councilor Assign Job' }, loadChildren: () => import('./councilorAssignJob/councilorAssignJob.module').then(m => m.CouncilorAssignJobModule) },
        { path: ':jobAssignId', data: { breadcrumb: 'View' }, loadChildren: () => import('./addoredit/addoredit.module').then(m => m.AddoreditModule) },
    ])],
    exports: [RouterModule]
})
export class JobAssignRoutingModule { }
