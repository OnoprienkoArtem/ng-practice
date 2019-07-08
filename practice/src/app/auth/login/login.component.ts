import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MessagesService } from '../../services/messages.service';

import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film';
import { LOCAL_CONFIG } from '../../config/config-api';
import { ApiConfig } from '../../models/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials = { username: '', password: '' };
  errorMessage = '';
  public films: Film[] = [];
  public imgUrl: string = this.localConfig.bigBackPath; 
  public backgrounds: string; 
  

  public formSection: boolean = false;

  public loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    public filmsService: FilmService,
    @Inject(LOCAL_CONFIG) public localConfig: ApiConfig,
    private msgService: MessagesService,
   
  ) {
  }


  ngOnInit() {  ;

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
        console.log(this.films);  
      },
      err => console.log("error", err)
    )

  }

  login() {
    this.errorMessage = '';   

    if (this.loginForm.invalid) {      
      return;
    }  
    
    this.authService.login(this.credentials.username, this.credentials.password)
      .subscribe(
        () => {
          this.msgService.setMessage({
            type: 'success',
            body: `${this.credentials.username}, Вы успешно вошли в систему. Добро пожаловать!`
          });
          this.formSection = true;
          setTimeout(() => {            
            this.router.navigate(['/main']);
          }, 2000);
        },
        err => {
          this.errorMessage = err.error.error;
          this.msgService.setMessage({
            type: 'danger',
            body: err.error.error
          });
        }
      );
  }

  get f() {
    return this.loginForm.controls;
  }

  public getEmailErrorMessage() {
    return this.f.email.hasError("required") ? "Пожалуйста, заполните это поле!"
        : this.f.email.hasError("email") ? "Не валидный Email." : "";
  }

  public getErrorMessageForPassword() {
    return this.f.password.hasError("required") ? "Пожалуйста, заполните это поле!"
        : this.f.password.hasError("minlength") ? "Это поле должно содержать не менее 8 символов." : "";
  }





}

