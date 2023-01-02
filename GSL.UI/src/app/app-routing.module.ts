import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AdminGuard } from './layout/Guard/admin.guard';
import { AdminStafGuard } from './layout/Guard/adminStaf.guard';
import { StafGuard } from './layout/Guard/staf.guard';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled',
};

const routes: Routes = [
    {
        path:'',
        redirectTo:'auth/login',
        pathMatch: 'full'
      },
    {
        path: '', component: AppLayoutComponent,
        canActivate:[AuthenticationGuard],
        children: [
             //master setup
            { path: 'dashboard', loadChildren: () => import('./layout/components/dashboards/dashboards.module').then(m => m.DashboardsModule) },
            { path: 'university', data: { breadcrumb: 'University' }, loadChildren: () => import('./layout/components/university/university.module').then(m => m.UniversityModule), canActivate:[AdminStafGuard] },
            { path: 'degree', data: { breadcrumb: 'Degree' }, loadChildren: () => import('./layout/components/degree/degree.module').then(m => m.DegreeModule) },
            { path: 'session', data: { breadcrumb: 'Session' }, loadChildren: () => import('./layout/components/session/session.module').then(m => m.SessionModule) },
            { path: 'year', data: { breadcrumb: 'Year' }, loadChildren: () => import('./layout/components/year/profile.module').then(m => m.ProfileModule) },
            { path: 'subject', data: { breadcrumb: 'Subject' }, loadChildren: () => import('./layout/components/subject/subject.module').then(m => m.SubjectModule) },
            
            //registation
            { path: 'user', data: { breadcrumb: 'User' }, loadChildren: () => import('./layout/components/user/user.module').then(m => m.UserModule) },
            
           
            //job Assign
            { path: 'job-assign', data: { breadcrumb: 'Job Assign' }, loadChildren: () => import('./layout/components/jobAssign/jobAssign.module').then(m => m.JobAssignModule) },
           //studen portal
            { path: 'student-portal', data: { breadcrumb: 'Student Portal' }, loadChildren: () => import('./layout/components/studentPortal/studentPortal.module').then(m => m.StudentPortalModule) },
           //Accounting
            { path: 'payment', data: { breadcrumb: 'Payment' }, loadChildren: () => import('./layout/components/payment/payment.module').then(m => m.PaymentModule) },
            { path: 'payment-report', data: { breadcrumb: 'Payment Report' }, loadChildren: () => import('./layout/components/paymentReport/paymentReport.module').then(m => m.PaymentReportModule) },
            { path: 'expense', data: { breadcrumb: 'Expense' }, loadChildren: () => import('./layout/components/expense/expense.module').then(m => m.ExpenseModule) },

            { path: 'registation', data: { breadcrumb: 'Registation' }, loadChildren: () => import('./layout/components/registation/registation.module').then(m => m.RegistationModule) },
            //{ path: 'register', data: { breadcrumb: 'Pages' }, loadChildren: () => import('./layout/components/register/register.module').then(m => m.RegisterModule) },
            //{ path: '', data: { breadcrumb: 'Auth' }, loadChildren: () => import('./layout/components/auth/auth.module').then(m => m.AuthModule) },
            //{ path: 'purchase', data: { breadcrumb: 'Pages' }, loadChildren: () => import('./layout/components/purchase/purchase.module').then(m => m.PurchaseModule) },
            //{ path: 'mail', data: { breadcrumb: 'Pages' }, loadChildren: () => import('./layout/components/apps/mail/mail.app.module').then(m => m.MailAppModule) },
            //{ path: 'apps', data: { breadcrumb: 'Apps' }, loadChildren: () => import('./layout/components/apps/apps.module').then(m => m.AppsModule) },
            //{ path: 'qualification', data: { breadcrumb: 'Pages' }, loadChildren: () => import('./layout/components/qualification/qualification.module').then(m => m.QualificationModule) },
            //{ path: 'agreement', data: { breadcrumb: 'Pages' }, loadChildren: () => import('./layout/components/agreement/agreement.module').then(m => m.AgreementModule) },
            
            //{ path: 'personalInformation', data: { breadcrumb: 'Pages' }, loadChildren: () => import('./layout/components/personalInformation/personalInformation.module').then(m => m.PersonalInformationModule) },
            //{ path: 'studentPortal', data: { breadcrumb: 'Pages' }, loadChildren: () => import('./layout/components/studentPortal/studentPortal.module').then(m => m.StudentPortalModule) },
            // { path: 'scores', data: { breadcrumb: 'Pages' }, loadChildren: () => import('./layout/components/scores/scores.module').then(m => m.ScoresModule) },
            //{ path: 'passportDetails', data: { breadcrumb: 'Pages' }, loadChildren: () => import('./layout/components/passportDetails/passportDetails.module').then(m => m.PassportDetailsModule) },
            //{ path: 'embassyDocument', data: { breadcrumb: 'Pages' }, loadChildren: () => import('./layout/components/embassyDocument/embassyDocument.module').then(m => m.EmbassyDocumentModule) },
            //{ path: 'account', data: { breadcrumb: 'Pages' }, loadChildren: () => import('./layout/components/account/account.module').then(m => m.AccountModule) },
            
            //{ path: 'exam', data: { breadcrumb: 'Pages' }, loadChildren: () => import('./layout/components/exam/exam.module').then(m => m.ExamModule) },
            //{ path: 'studentPanel', data: { breadcrumb: 'Pages' }, loadChildren: () => import('./layout/components/studentPanel/studentPanel.module').then(m => m.StudentPanelModule) },
           
            { path: 'apply', data: { breadcrumb: 'Apply' }, loadChildren: () => import('./layout/components/apply/apply.module').then(m => m.ApplyModule) },
            
            //{ path: 'documents', data: { breadcrumb: 'Pages' }, loadChildren: () => import('./layout/components/documents/documents.module').then(m => m.DocumentsModule) },
            //{ path: 'profile', data: { breadcrumb: 'User Management' }, loadChildren: () => import('./layout/components/year/profile.module').then(m => m.ProfileModule) },

        ]
    },
    { path: 'auth', data: { breadcrumb: 'Auth' }, loadChildren: () => import('./layout/components/auth/auth.module').then(m => m.AuthModule) },
    { path: 'notfound', loadChildren: () => import('./layout/components/notfound/notfound.module').then(m => m.NotfoundModule) },
    { path: '**', redirectTo: '/notfound' }
   


];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
