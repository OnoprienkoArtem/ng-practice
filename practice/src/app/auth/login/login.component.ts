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
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public films: Film[] = [];
  public imgUrl: string = this.localConfig.bigBackPath; 
  public backgrounds: string; 
  public formSection: boolean = false;
  public loginForm: FormGroup;
  private durationInSeconds = 2;
  hide = true;

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
      name: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
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
    
    this.authService.login(this.loginForm.value.name, this.loginForm.value.password);    

    this.msgService.getState().subscribe(res => {
      let message = res ? ['вы успешно авторизовались', 'success'] : ['ошибка авторизации', 'error'];     
      this.openSnackBar(message[0], message[1]); 
    });    

  }

  get f() {
    return this.loginForm.controls;
  }

  public getNameErrorMessage() {  
      if (this.f.name.hasError("required")) {
        return "Пожалуйста, заполните это поле!";
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

