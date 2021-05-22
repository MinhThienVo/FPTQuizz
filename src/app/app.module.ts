import { MyLibraryComponent } from './Component/my-library/my-library.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { from } from 'rxjs';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatNativeDateModule } from '@angular/material/core';
// tslint:disable-next-line:jsdoc-format
/**?****************8** */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Component/login/login.component';
import { RegisterComponent } from './Component/register/register.component';
import { SettingComponent } from './Component/setting/setting.component';
import { CollectionComponent } from './Component/collection/collection.component';
import { CollectionSaveComponent } from './Component/collection-save/collection-save.component';
import { ClassesEditComponent } from './Component/classes-edit/classes-edit.component';
import { QuestionCreateComponent } from './Component/question-create/question-create.component';
import { QuestionEditComponent } from './Component/question-edit/question-edit.component';
import { QuizzDetailComponent } from './Component/quizz-detail/quizz-detail.component';
import { SearchComponent } from './Component/search/search.component';
import { ReportComponent } from './Component/report/report.component';
import { ShareComponent } from './Component/share/share.component';
import { StudentEditComponent } from './Component/student-edit/student-edit.component';
import { TitleLessonComponent } from './Component/title-lesson/title-lesson.component';
import { TitleQuizzComponent } from './Component/title-quizz/title-quizz.component';
import { HomeAdminComponent } from './Component/home-admin/home-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenService } from './Service/auth_login.service';
import { AuthRouteGuard } from './Guard/auth.route.guard';
import { AuthInterceptor } from './Interceptor/auth.imtercepotr';
import { ChooseRollComponent } from './component/register/choose-roll/choose-roll.component';
import { TeacherAccountDetailsComponent } from './component/register/teacher-account-details/teacher-account-details.component';
import { StudentAccountDetailsComponent } from './component/register/student-account-details/student-account-details.component';
import { BaseService } from './Service/base.service';
import { SettingJoinComponent } from './Component/setting-join/setting-join.component';
import { PasswordDialogComponent } from './Component/setting-join/password-dialog/password-dialog.component';
import { NameDialogComponent } from './Component/setting-join/name-dialog/name-dialog.component';
import { MatDialogComponent } from './Component/setting-join/mat-dialog/mat-dialog.component';
import { GradeDialogComponent } from './Component/setting-join/grade-dialog/grade-dialog.component';
import { DeleteaccDialogComponent } from './Component/setting-join/deleteacc-dialog/deleteacc-dialog.component';
import { JoinComponent } from './Component/join/join.component';
// login with google
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';
import { DeleteAccountDialogComponent } from './Component/setting/delete-account-dialog/delete-account-dialog.component';
import { CreateQuizzComponent } from './Component/create-quizz/create-quizz.component';
import { MatChipsModule } from '@angular/material/chips';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  NgbPaginationModule,
  NgbAlertModule,
} from '@ng-bootstrap/ng-bootstrap';
import { HotTableModule } from '@handsontable/angular';
import { NgxSummernoteModule } from 'node_modules/ngx-summernote';
import { EditCollectionComponent } from './Component/my-library/edit-collection/edit-collection.component';
import { CreateCollectionComponent } from './Component/my-library/create-collection/create-collection.component';
import { CreatePartComponent } from './Component/create-quizz/create-part/create-part.component';
import { AddToCollectionComponent } from './Component/my-library/add-to-collection/add-to-collection.component';
import { DialogStudentDetailsComponent } from './Component/classes-edit/dialog/dialog-student-details/dialog-student-details.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { MatStepperModule } from '@angular/material/stepper'
import { MatTreeModule } from '@angular/material/tree';
import { DialogDeleteClassComponent } from './Component/classes-edit/dialog/dialog-delete-class/dialog-delete-class.component';
import { DialogDeleteStudentComponent } from './Component/classes-edit/dialog/dialog-delete-student/dialog-delete-student.component';
import { HomepageComponent } from './Component/homepage/homepage.component';
import { AddQuestionPoolComponent } from 'src/app/Component/create-quizz/add-question-pool/add-question-pool.component';
import { DeletePartComponent } from 'src/app/Component/create-quizz/delete-part/delete-part.component';
import { EditPartComponent } from 'src/app/Component/create-quizz/edit-part/edit-part.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    CreatePartComponent,
    AddQuestionPoolComponent,
    DeletePartComponent,
    EditPartComponent,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SettingComponent,
    CollectionComponent,
    CollectionSaveComponent,
    // ClassesEditComponent,
    QuestionCreateComponent,
    QuestionEditComponent,
    QuizzDetailComponent,
    SearchComponent,
    ReportComponent,
    ShareComponent,
    StudentEditComponent,
    TitleLessonComponent,
    HomepageComponent,
    // TitleQuizzComponent,
    HomeAdminComponent,
    ChooseRollComponent,
    TeacherAccountDetailsComponent,
    StudentAccountDetailsComponent,
    SettingJoinComponent,
    JoinComponent,
    PasswordDialogComponent,
    NameDialogComponent,
    MatDialogComponent,
    GradeDialogComponent,
    DeleteaccDialogComponent,
    DeleteAccountDialogComponent,
    CreateQuizzComponent,
    CreatePartComponent,
    EditCollectionComponent,
    CreateCollectionComponent,
    TitleQuizzComponent,
    ClassesEditComponent,
    AddToCollectionComponent,
    MyLibraryComponent,
    DialogStudentDetailsComponent,
    DialogDeleteClassComponent,
    DialogDeleteStudentComponent,
  ],
  imports: [
    MatProgressBarModule,
    DragDropModule,
    MatTreeModule,
    MatStepperModule,
    NgxSummernoteModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgxSpinnerModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatStepperModule,
    MatTabsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatDialogModule,
    FormsModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule,
    FontAwesomeModule,
    MatSnackBarModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatPasswordStrengthModule.forRoot(),
    SocialLoginModule,
    MatChipsModule,
    // CKEditorModule,
    MatFileUploadModule,
    // NgbModule,
    HotTableModule,
    NgbModule,
  ],
  providers: [
    AuthenService,
    AuthRouteGuard,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BaseService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '640440327652-sem8la2ur4a1kep3qjuicv9nrh1t40uq.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
