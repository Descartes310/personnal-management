import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from '../_services/lang.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  lan;
  user;
  constructor(
    private authService: AuthService,
    private translateService: TranslateService,
    private langService: LangService,
    private router: Router
  ) { }

  ngOnInit() {
    this.lan = this.translateService.currentLang;
    console.log('La langue courante est: ', this.translateService.currentLang);
    this.user = this.authService.getUser();
  }

  logout() {
    this.authService.logout();
  }

  changeLanguage(value) {
    this.langService.setLang(value);
    this.lan = value;
  }

  goToChat() {
    this.router.navigate(['/chat']);
  }

}
