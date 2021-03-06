import { Component, OnInit } from '@angular/core';
import { Division } from 'src/app/_models/division.model';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DivisionService } from 'src/app/_services/division.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-all-division',
  templateUrl: './all-division.component.html',
  styleUrls: ['./all-division.component.scss']
})
export class AllDivisionComponent implements OnInit {
  divisions: Division[] = [];
  loading = true;
  @BlockUI() blockUI: NgBlockUI;

  // SweetAlert Text
  areYouSure = '';
  warning = '';
  yes = '';
  no = '';
  deleted = '';
  deletedMessage = '';
  cancelled = '';
  cancelledMessage = '';
  canCreate = false;
  canUpdate = false;
  canDelete = false;

  constructor(
    private authService: AuthService,
    private divisionService: DivisionService,
    private notifService: NotifService,
    private translate: TranslateService,
    private router: Router) {

      this.translate.get(
        ['SweetAlert.AreYouSure', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
        'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'],
        { data: 'division' })
        .subscribe(val => {
          this.areYouSure = val['SweetAlert.AreYouSure'];
          this.warning = val['SweetAlert.Warning'];
          this.yes = val['SweetAlert.Yes'];
          this.no = val['SweetAlert.No'];
          this.deleted = val['SweetAlert.Deleted'];
          this.deletedMessage = val['SweetAlert.DeletedMessage'];
          this.cancelled = val['SweetAlert.Cancelled'];
          this.cancelledMessage = val['SweetAlert.CancelledMessage'];
        });
   }

   ngOnInit() {
     this.getDivisions();
     const permissionSuffix = 'divisions';
     this.canCreate = this.authService.hasPermission(`create-${permissionSuffix}`);
     this.canUpdate = this.authService.hasPermission(`update-${permissionSuffix}`);
     this.canDelete = this.authService.hasPermission(`delete-${permissionSuffix}`);
  }

  getDivisions() {
    this.loading = true;
    this.divisionService.all().then(
      response => {
        this.divisions = [];
        response.map( division => {
          this.divisions.push(new Division(division));
        });
      }
    ).catch(
      error => {
        this.notifService.danger(error.error.message);
      }
    ).finally(
      () => {
        if (this.divisions && this.divisions.length) {
          this.divisions.forEach(div => {
            if (div.parent_id != null) {
              this.divisions.forEach(parent => {
                if (parent.id == div.parent_id) {
                  div.division = parent;
                }
              });
            } else {
              div.division = null;
            }
          });
        }
        this.loading = false;
      }
    );
  }

  editDivision(division: Division) {
    this.router.navigate(['/divisions/update/' + division.id]);
  }

  detailsDivision(division: Division) {
    this.router.navigate(['/divisions/details/' + division.id]);
  }

  deleteDivision(division: Division) {
    Swal.fire({
      title: this.areYouSure,
      text: this.warning,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.yes,
      cancelButtonText: this.no
    }).then((result) => {
      if (result.value) {
        this.blockUI.start('Loading...');
        this.divisionService.delete(division.id).then(
          data => {
            this.blockUI.stop();
            Swal.fire(
              this.deleted,
              this.deletedMessage,
              'success'
            );
            this.getDivisions();
          }
        ).catch(
          error => {
            this.blockUI.stop();
            this.translate.get('Division.' + error.error.code)
            .subscribe(val => this.notifService.danger(val));
          }
        );

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          this.cancelled,
          this.cancelledMessage,
          'error'
        );
      }
    });
  }

}
