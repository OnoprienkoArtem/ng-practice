import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessagesService } from './messages.service';
import { LOCAL_CONFIG } from '../config/config-api';
import { ApiConfig } from '../models/api';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
 
  private loggedIn = false;

  constructor(
    private http: HttpClient, 
    public router: Router,
    public messagesService: MessagesService,
    @Inject(LOCAL_CONFIG) public localConfig: ApiConfig
    ) {   
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getToken() {
    return this.http.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=f7ce96b08789255f247db434150c7493`);
  }

  bindingTokenWithAccount(requst_token: string, username: string, password: string) {
    return this.http.get(`https://api.themoviedb.org/3/authentication/token/validate_with_login?username=${username}&password=${password}&request_token=${requst_token}&api_key=f7ce96b08789255f247db434150c7493`);
  }

  login(username: string, password: string) {   
    this.getToken().subscribe(
      (token: any) => { 
        this.bindingTokenWithAccount(token.request_token, username, password).subscribe(
          (authentication: any) => { 
            if (authentication.success) {            
              localStorage.setItem('auth_token', token.request_token);
              this.loggedIn = true;
              this.messagesService.messageAction(true);
              setTimeout(() => {            
                this.router.navigate(['/main']);
              }, 2200);
            }
          },
          err => {           
            this.messagesService.messageAction(false);
          }
        )
      }
    ) 
  }

  logout() {
    this.loggedIn = false;
    this.router.navigate(['/login']); 
    localStorage.removeItem('auth_token');    
  }
}


// 'artemo', 'cinemaart'
