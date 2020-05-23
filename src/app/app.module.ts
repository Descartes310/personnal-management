import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AddTokenInterceptor } from './_http-interceptors/add-token.interceptor'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from './_guards/auth.guard'
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NavigationDrawerComponent } from './navigation-drawer/navigation-drawer.component';
import { ThemeSettingComponent } from './theme-setting/theme-setting.component';
import { AddProSituationComponent } from './pro_situations/add-pro-situation/add-pro-situation.component';
import { UpdateProSituationComponent } from './pro_situations/update-pro-situation/update-pro-situation.component';
import { AllProSituationComponent } from './pro_situations/all-pro-situation/all-pro-situation.component';
import { FindProSituationComponent } from './pro_situations/find-pro-situation/find-pro-situation.component';
import { DocumentViewerComponent } from './document-viewer/document-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AddRoleComponent } from './roles/add-role/add-role.component';
import { AllRolesComponent } from './roles/all-roles/all-roles.component';
import { BlockUIModule } from 'ng-block-ui';
import { UpdateRoleComponent } from './roles/update-role/update-role.component';
import { DetailsRoleComponent } from './roles/details-role/details-role.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AllAssignmentsComponent } from './assignments/all-assignments/all-assignments.component';
import { ChatComponent } from './chat/chat.component';
import { AddContactComponent } from './contacts/add-contact/add-contact.component';
import { UpdateContactComponent } from './contacts/update-contact/update-contact.component';
import { AddAssignmentTypeComponent } from './assignment-types/add-assignment-type/add-assignment-type.component';
import { UpdateAssignmentTypeComponent } from './assignment-types/update-assignment-type/update-assignment-type.component';
import { AddProfileComponent } from './profiles/add-profile/add-profile.component';
import { UpdateProfileComponent } from './profiles/update-profile/update-profile.component';
import { AddVacationTypeComponent } from './vacation_types/add-vacation-type/add-vacation-type.component';
import { UpdateVacationTypeComponent } from './vacation_types/update-vacation-type/update-vacation-type.component';
import { AddLicenseComponent } from './licenses/add-license/add-license.component';
import { UpdateLicenseComponent } from './licenses/update-license/update-license.component';
//import { LicensetypesComponent } from './licensetypes/licensetypes.component';
import { AddLicensetypesComponent } from './licensetypes/add-licensetypes/add-licensetypes.component';
import { UpdateLicensetypesComponent } from './licensetypes/update-licensetypes/update-licensetypes.component';
import { AddDivisionComponent } from './divisions/add-division/add-division.component';
import { UpdateDivisionComponent } from './divisions/update-division/update-division.component';
import { TemplateCreateComponent } from './templates/template-create/template-create.component';
import { TemplateUpdateComponent } from './templates/template-update/template-update.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

import {MatStepperModule, MatInputModule,MatFormFieldModule} from '@angular/material';
import { DetailsProSituationComponent } from './pro_situations/details-pro-situation/details-pro-situation.component';
import { UpdateAssignmentComponent } from './assignments/update-assignment/update-assignment.component';
import { DetailsAssignmentComponent } from './assignments/details-assignment/details-assignment.component';
import { AddSubmissionComponent } from './submissions/add-submission/add-submission.component';
import { UpdateSubmissionComponent } from './submissions/update-submission/update-submission.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AddSanctionComponent } from './sanctions/add-sanction/add-sanction.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    NotfoundComponent,
    SideBarComponent,
    NavigationDrawerComponent,
    ThemeSettingComponent,
    AddProSituationComponent,
    UpdateProSituationComponent,
    AllProSituationComponent,
    FindProSituationComponent,
    DocumentViewerComponent,
    AddRoleComponent,
    AllRolesComponent,
    UpdateRoleComponent,
    DetailsRoleComponent,
    AddAssignmentComponent,
    AllAssignmentsComponent,
    UpdateAssignmentComponent,
    ChatComponent,
    AddContactComponent,
    UpdateContactComponent,
    AddAssignmentTypeComponent,
    UpdateAssignmentTypeComponent,
    AddProfileComponent,
    UpdateProfileComponent,
    AddVacationTypeComponent,
    UpdateVacationTypeComponent,
    AddLicenseComponent,
    UpdateLicenseComponent,
    AddLicensetypesComponent,
    UpdateLicensetypesComponent,
    AddDivisionComponent,
    UpdateDivisionComponent,
    TemplateCreateComponent,
    TemplateUpdateComponent,
    DetailsProSituationComponent,
    DetailsAssignmentComponent,
    AddSubmissionComponent,
    UpdateSubmissionComponent,
    AddSanctionComponent,
  ],
  imports: [
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularEditorModule,
    ReactiveFormsModule,
    PdfViewerModule,
    CKEditorModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot(),
    BlockUIModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
