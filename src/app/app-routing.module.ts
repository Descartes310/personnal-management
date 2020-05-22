import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuardService as AuthGuard } from './_guards/auth.guard'

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DocumentViewerComponent } from './document-viewer/document-viewer.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AddProSituationComponent } from './pro_situations/add-pro-situation/add-pro-situation.component'
import { AddRoleComponent } from './roles/add-role/add-role.component';
import { AllRolesComponent } from './roles/all-roles/all-roles.component';
import { UpdateRoleComponent } from './roles/update-role/update-role.component';
import { DetailsRoleComponent } from './roles/details-role/details-role.component';
import { UpdateProSituationComponent } from './pro_situations/update-pro-situation/update-pro-situation.component';
import { ChatComponent } from './chat/chat.component'
import { AddContactComponent } from './contacts/add-contact/add-contact.component';
import { UpdateContactComponent } from './contacts/update-contact/update-contact.component';
import { TemplateUpdateComponent } from './templates/template-update/template-update.component';
import { TemplateCreateComponent } from './templates/template-create/template-create.component';
import { AddAssignmentTypeComponent } from './assignment-types/add-assignment-type/add-assignment-type.component';
import { UpdateAssignmentTypeComponent } from './assignment-types/update-assignment-type/update-assignment-type.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';

import { AddVacationTypeComponent } from './vacation_types/add-vacation-type/add-vacation-type.component';
import { UpdateVacationTypeComponent } from './vacation_types/update-vacation-type/update-vacation-type.component';
import { AddLicenseComponent } from './licenses/add-license/add-license.component';
import { UpdateLicenseComponent } from './licenses/update-license/update-license.component';
import { AddLicensetypesComponent } from './licensetypes/add-licensetypes/add-licensetypes.component';

//import { UpdateLicensetypesComponent } from './licensetypes/update-licensetypes/update-licensetypes.component'
import { AllNotecriteriasComponent } from './notecriterias/all-notecriterias/all-notecriterias.component';
import { DeleteNotecriteriasComponent } from './notecriterias/delete-notecriterias/delete-notecriterias.component';
import { DetailsNotecriteriasComponent } from './notecriterias/details-notecriterias/details-notecriterias.component';

import { UpdateLicensetypesComponent } from './licensetypes/update-licensetypes/update-licensetypes.component';
import { AddDivisionComponent } from './divisions/add-division/add-division.component';
import { UpdateDivisionComponent } from './divisions/update-division/update-division.component';
import { AllSubmissionsComponent } from './submissions/all-submissions/all-submissions.component';

import { AllProSituationComponent } from './pro_situations/all-pro-situation/all-pro-situation.component';
import { DetailsProSituationComponent } from './pro_situations/details-pro-situation/details-pro-situation.component';
import { AddVacationComponent } from './vacation/add-vacation/add-vacation.component';
import { UpdateVacationComponent } from './vacation/update-vacation/update-vacation.component';



import { AllAssignmenttypeComponent } from './assignmenttypes/all-assignmenttype/all-assignmenttype.component';
import { DetailsAssignmenttypeComponent } from './assignmenttypes/details-assignmenttype/details-assignmenttype.component';

import { AllSanctionsComponent } from './sanctions/all-sanctions/all-sanctions.component';
import { DetailsSanctionComponent } from './sanctions/details-sanction/details-sanction.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'pro-situations/add', component: AddProSituationComponent },
  { path: 'pro-situations/update/:id', component: UpdateProSituationComponent },
  { path: 'users/add', component: AddUserComponent },
  { path: 'users/update/:id', component: UpdateUserComponent },
  { path: 'pro-situations/update/:id', component: UpdateProSituationComponent},
  { path: 'pro-situations/all',  component: AllProSituationComponent},
  { path: 'pro-situations/details/:id', component: DetailsProSituationComponent },
  { path: 'licensetypes/add', component: AddLicensetypesComponent },
  { path: 'licensetypes/update/:id', component: UpdateLicensetypesComponent },
  { path: 'roles/add', component: AddRoleComponent },
  { path: 'roles/all', component: AllRolesComponent },
  { path: 'submissions/all', component: AllSubmissionsComponent },
  { path: 'roles/update/:id', component: UpdateRoleComponent },
  { path: 'templates/create', component: TemplateCreateComponent },
  { path: 'templates/update/:id', component: TemplateUpdateComponent },
  { path: 'roles/details/:id', component: DetailsRoleComponent },
  { path: 'notecriterias/all', component: AllNotecriteriasComponent },
  { path: 'notecriterias/delete/:id', component: DeleteNotecriteriasComponent },
  { path: 'notecriterias/details/:id', component: DetailsNotecriteriasComponent },
  { path: 'document-viewer', component: DocumentViewerComponent },
  { path: 'assignmenttype/details/:id', component: DetailsAssignmenttypeComponent },
  { path: 'assignmenttype/all', component: AllAssignmenttypeComponent },
  { path: 'vacation-types/add', component: AddVacationTypeComponent },
  { path: 'vacation-types/update/:id', component: UpdateVacationTypeComponent },
  { path: 'licenses/add', component: AddLicenseComponent },
  { path: 'licenses/update/:id', component: UpdateLicenseComponent },
  { path: 'divisions/add', component: AddDivisionComponent },
  { path: 'divisions/update/:id', component: UpdateDivisionComponent },
  { path: 'document-viewer', component: DocumentViewerComponent },
  //routes pour ajout et update des contacts
  { path: 'contacts/update/:id', component:UpdateContactComponent},
  { path: 'contacts/add',component:AddContactComponent},
  { path: 'assignment-types/add', component: AddAssignmentTypeComponent },
  { path: 'assignment-types/update/:id', component: UpdateAssignmentTypeComponent },

  { path: 'sanction/all', component: AllSanctionsComponent },
  { path: 'sanction/details/:id', component: DetailsSanctionComponent },

  { path: 'vacations/update/:id', component: UpdateVacationComponent },
  { path: 'vacations/add', component: AddVacationComponent },
  //{ path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: 'login' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
