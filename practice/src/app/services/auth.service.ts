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
    return this.http.get(`${this.localConfig.tokenUrl}?api_key=${this.localConfig.apiKey}`);
  }

  authenticationToken(requst_token: string, username: string, password: string) {
    return this.http.get(`${this.localConfig.authenticationUrl}?username=${username}&password=${password}&request_token=${requst_token}&api_key=${this.localConfig.apiKey}`);
  }

  getSession(requst_token: string) {
    return this.http.get(`${this.localConfig.sessionUrl}?api_key=${this.localConfig.apiKey}&request_token=${requst_token}`);
  }

  getUserData(session_id: string) {
    return this.http.get(`${this.localConfig.accountUrl}?api_key=${this.localConfig.apiKey}&session_id=${session_id}`);
  }

  login(username: string, password: string) {   
    this.getToken().subscribe(
      (token: any) => { 
        this.authenticationToken(token.request_token, username, password).subscribe(
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
