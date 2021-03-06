import { Component, OnInit } from '@angular/core';
import { BlogCategory } from 'src/app/_models/blog.category.model';
import { BlogCategoryService } from 'src/app/_services/blog-category.service';
import { NotifService } from 'src/app/_services/notif.service';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-all-blog-category',
  templateUrl: './all-blog-category.component.html',
  styleUrls: ['./all-blog-category.component.scss']
})
export class AllBlogCategoryComponent implements OnInit {

  blogcats: BlogCategory[] = [];
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
    private blogCategoryService: BlogCategoryService,
    private notifService: NotifService,
    private translate: TranslateService,
    private router: Router) {

      this.translate.get(
        ['SweetAlert.AreYouSure', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
        'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'],
        { data: 'cat blog' })
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
     this.getBlogCategories();
     const permissionSuffix = 'blog-categories';
     this.canCreate = this.authService.hasPermission(`create-${permissionSuffix}`);
     this.canUpdate = this.authService.hasPermission(`update-${permissionSuffix}`);
     this.canDelete = this.authService.hasPermission(`delete-${permissionSuffix}`);
  }

  getBlogCategories() {
    this.loading = true;
    this.blogCategoryService.all().then(
      response => {
        this.blogcats = [];
        response.data.map( blogcat => {
          this.blogcats.push(new BlogCategory(blogcat));
        });
      }
    ).catch(
      error => {
        this.notifService.danger(error.error.message);
      }
    ).finally(
      () => {
        this.loading = false;
      }
    );
  }

  editblogcat(blogcat: BlogCategory) {
    this.router.navigate(['blog-category/update/' + blogcat.id]);
  }

  detailsblogcat(blogcat: BlogCategory) {
    this.router.navigate(['blog-category/details/' + blogcat.id]);
  }

  deleteblogcat(blogcat: BlogCategory) {
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
        this.blogCategoryService.delete(blogcat.id).then(
          data => {
            this.blockUI.stop();
            Swal.fire(
              this.deleted,
              this.deletedMessage,
              'success'
            );
            this.getBlogCategories();
          }
        ).catch(
          error => {
            this.blockUI.stop();
            this.translate.get('BlogCategory.' + error.error.code)
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


