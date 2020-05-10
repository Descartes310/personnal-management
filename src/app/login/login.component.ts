import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotifService } from '../_services/notif.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  unknowError = false;
  isLoading = false;
  notLogged = false;
  isLoginError = false;
  isLoginSuccess = false;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private notifService: NotifService) {
  }

  ngOnInit() {

    if (this.authService.isLogged() ) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }

    // Validateur du formulaire
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      if (params.returnUrl) {
        this.notLogged = true;
      }
    });

  }

  get form() {
    return this.loginForm.controls;
  }

  /**
   * @ngdoc function
   * @description Cette fonction fait verifie si les params de connexion sont
   * bien remplis et fait appel a la methode login de AuthService
   * @author Descartes Fowo
   */
  onSubmit() {
    this.notifService.danger('text');
    this.isSubmitted = true;
    this.unknowError = false;
    this.isLoginError = false;
    this.isLoginSuccess = false;
    this.isLoading = false
    // Si la validation a echoué, on arrete l'execution de la fonction
    if (this.loginForm.invalid) {
      console.log('error')
      return;
    }

    this.isLoading = true;
    this.authService.login(this.form.email.value, this.form.password.value)
      .then(resp => {
        
      })
      .catch(err => {
        
      })
      .finally(() => this.isLoading = false);
  }
}
