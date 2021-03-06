import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/_services/role.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Role } from 'src/app/_models/role.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent implements OnInit {

  permissions: any[] = [];
  permissions_tmp: any[] = [];
  selected_permissions: number[] = [];

  roleForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  role_name = '';
  role: Role = new Role();


  constructor(
    private roleService: RoleService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.initForm();
    this.getPermissions();
    const role_id = +this.route.snapshot.paramMap.get("id");
    this.roleService.find(role_id).then(
      data => {
        this.role = data;
        this.initForm(true);
        this.role.permissions.map( permission => {
          this.selected_permissions.push(permission.id)
        })
      }
    ).catch(
      error => {
        this.translate.get('Role.'+error.error.code)
        .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/roles/all'])
      }
    )

  }

  initForm(withRole = false) {
    if(withRole) {
      console.log(this.role)
      this.roleForm = this.formBuilder.group({
        name: [this.role.name, [Validators.required]],
        label: [this.role.display_name, [Validators.required]],
        description: [this.role.description]
      });
    }else {
      this.roleForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        label: ['', [Validators.required]],
        description: ['']
      });
    }
  }

  get form() {
    return this.roleForm.controls;
  }

  getPermissions() {
    this.roleService.permissions().then(
      response => {
        this.permissions = response;
        this.permissions_tmp = response;
      }
    ).catch(
      error => {
        this.notifService.danger("Une erreur s'est produite");
      }
    )
  }

  computeName(event){
    this.role_name = event.target.value.replace(/[^A-Z0-9]/ig, "_");
  }

  computeNameFromString(event: string): string{
    return event.replace(/[^A-Z0-9]/ig, "_");
  }

  search(event) {
    this.permissions = this.permissions_tmp;
    this.permissions = this.permissions_tmp.filter( permission => permission.display_name.toLowerCase().includes(event.target.value.toLowerCase()));
  }

  onChecked(permission, event){
    if(event.target.checked) {
      this.selected_permissions.push(permission.id);
    } else {
      this.selected_permissions.splice(this.selected_permissions.indexOf(permission.id), 1);
    }
  }

  isChecked(id: number){
    return this.selected_permissions.includes(id);
  }

  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    // Si la validation a echoué, on arrete l'execution de la fonction
    this.form.name.value.length <= 0 ? this.form.name.setValue(this.computeNameFromString(this.form.label.value)) : null;
    if (this.roleForm.invalid) {
      this.translate.get('Role.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    if(this.selected_permissions.length <= 0) {
      this.translate.get('Role.SubmitErrorPermissions')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('display_name', '' + this.form.label.value);
    formData.append('name', '' + this.form.name.value);
    formData.append('description', '' + this.form.description.value);
    this.selected_permissions.forEach( elt => {
      formData.append('permissions[]', JSON.stringify(elt));
    });
    this.roleService.update(formData, this.role.id)
      .then(resp => {
        this.translate.get('Role.SubmitSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.roleForm.reset();
        this.selected_permissions = [];
        this.router.navigate(['/roles/all']);
      })
      .catch(err => {
        console.log(err)
        this.translate.get('Role.'+err.code)
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }

}
