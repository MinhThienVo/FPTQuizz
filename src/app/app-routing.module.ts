import { JoinComponent } from './Component/join/join.component';
import { HomeAdminComponent } from './Component/home-admin/home-admin.component';
import { CollectionComponent } from './Component/collection/collection.component';
import { ClassesEditComponent } from './Component/classes-edit/classes-edit.component';
import { ReportComponent } from './Component/report/report.component';
import { RegisterComponent } from './Component/register/register.component';
import { TitleQuizzComponent } from './Component/title-quizz/title-quizz.component';
import { SettingComponent } from './Component/setting/setting.component';
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { ChooseRollComponent } from './component/register/choose-roll/choose-roll.component';
import { TeacherAccountDetailsComponent } from './component/register/teacher-account-details/teacher-account-details.component';
import { StudentAccountDetailsComponent } from './component/register/student-account-details/student-account-details.component';
import { CreateQuizzComponent } from './Component/create-quizz/create-quizz.component';
import { QuestionCreateComponent } from './Component/question-create/question-create.component';
import { MyLibraryComponent } from './Component/my-library/my-library.component';
import { HomepageComponent } from './Component/homepage/homepage.component';
import { SettingJoinComponent } from './Component/setting-join/setting-join.component';
import { QuizzDetailComponent } from './Component/quizz-detail/quizz-detail.component';
import { TermOfServiceComponent } from './Component/term-of-service/term-of-service.component';
import { PrivacyPolicyComponent } from './Component/privacy-policy/privacy-policy.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'term-of-service',
    component: TermOfServiceComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
  { path: 'setting-join', component: SettingJoinComponent },
  { path: 'join', component: JoinComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'choose-roll/:email', component: ChooseRollComponent },
  {
    path: 'teacher-account-details/:email/:role',
    component: TeacherAccountDetailsComponent,
  },
  {
    path: 'student-account-details/:email/:role',
    component: StudentAccountDetailsComponent,
  },
  {
    path: 'admin',
    component: HomeAdminComponent,
    children: [
      {
        path: 'my-library',
        component: MyLibraryComponent,
      },
      {
        // path: 'question-create/:tieude/:Id',
        path: 'question-create/:node.ID/:node.Name',
        component: QuestionCreateComponent,
      },
      {
        path: 'create-quizz',
        component: CreateQuizzComponent,
      },
      {
        path: 'setting',
        component: SettingComponent,
      },
      {
        path: 'classes',
        component: ClassesEditComponent,
      },
      { path: 'admin', component: HomeAdminComponent },
      { path: 'setting', component: SettingComponent },
      {
        path: 'report',
        component: ReportComponent,
      },
      {
        path: 'collection',
        component: CollectionComponent,
      },
      {
        path: 'explore',
        component: TitleQuizzComponent,
      },
      {
        path: 'detail/:item.Name/:item.ID',
        component: QuizzDetailComponent,
      },
    ],
  },
  {
    path: 'homepage',
    component: HomepageComponent,
  },
  {
    path: '',
    redirectTo: '/homepage',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
