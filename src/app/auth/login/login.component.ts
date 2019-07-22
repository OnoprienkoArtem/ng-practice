import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MessagesService } from '../../services/messages.service';

import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film';
import { LOCAL_CONFIG } from '../../config/config-api';
import { ApiConfig } from '../../models/api';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SnackBarComponent } from '../../shared/components/snack-bar/snack-bar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // credentials = { username: '', password: '' };
  errorMessage = '';
  public films: Film[] = [];
  public imgUrl: string = this.localConfig.bigBackPath; 
  public backgrounds: string; 
  public formSection: boolean = false;
  public loginForm: FormGroup;
  private durationInSeconds = 2;

  constructor(
    private authService: AuthService,
    private router: Router,
    public filmsService: FilmService,
    @Inject(LOCAL_CONFIG) public localConfig: ApiConfig,
    private msgService: MessagesService,
    private snackBar: MatSnackBar
  ) {
  }

  openSnackBar(message, status) {
      this.snackBar.openFromComponent(SnackBarComponent, {
        duration: this.durationInSeconds * 1000,    
        data: message,
        panelClass: status,
        verticalPosition: 'top' 
      });
  }




  ngOnInit() {  
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl("", [
        Validators.required,
        // Validators.minLength(8)
      ])
    });


    const isLogin = this.authService.isLoggedIn();

    if (isLogin) {
      this.router.navigate(['/main']);
    }

    this.filmsService.getPopularFilms().subscribe(
      (filmList: any) => {       
        this.films = filmList.results.slice(0, 10); 
        this.backgrounds = filmList.results.slice(0, 5); 
      },
      err => console.log("error", err)
    )

  }

  login() {
    if (this.loginForm.invalid) {      
      return;
    }      
    
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        () => {          
          this.openSnackBar('вы успешно авторизовались', 'success');
          this.formSection = true;
          setTimeout(() => {            
            this.router.navigate(['/main']);
          }, 2000);
        },
        err => {              
          this.openSnackBar('ошибка авторизации', 'error'); 
        }
      );
  }

  get f() {
    return this.loginForm.controls;
  }

  public getEmailErrorMessage() {  
      if (this.f.email.hasError("required")) {
        return "Пожалуйста, заполните это поле!";
      } else if (this.f.email.hasError("email")) {
        return "Не валидный Email."
      } else {
        return "";
      }
  }

  public getErrorMessageForPassword() {
    if (this.f.password.hasError("required")) {
      return "Пожалуйста, заполните это поле!";
    } else {
      return "";
    }
  }





}

