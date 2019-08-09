import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessagesService } from './messages.service';
import { LOCAL_CONFIG } from '../config/config-api';
import { ApiConfig } from '../models/api';
import { delay, concatMap } from 'rxjs/internal/operators';
import { Subject, Observable, interval } from 'rxjs';
import { mergeMap, tap, map, debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  public user: any;

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
    return this.http.get(`${this.localConfig.sessionUrl}/new?api_key=${this.localConfig.apiKey}&request_token=${requst_token}`);
  }

  getUserData(session_id: string) {
    return this.http.get(`${this.localConfig.accountUrl}?api_key=${this.localConfig.apiKey}&session_id=${session_id}`);
  }

  removeSession(httpParams) {
    let options = { params: httpParams };
    return this.http.delete(`${this.localConfig.sessionUrl}?api_key=${this.localConfig.apiKey}`, options);
  }

  // login(username: string, password: string) {
    
  //   this.getToken().subscribe((token: any) => {
  //     console.log(token);

  //     this.authenticationToken(token.request_token, username, password).subscribe((authentication: any) => {
  //       console.log(authentication);

  //       if (authentication.success) {
  //         localStorage.setItem('auth_token', token.request_token);
  //         this.loggedIn = true;
  //         this.messagesService.messageAction(true);

  //         setTimeout(() => {
  //           this.router.navigate(['/main']);
  //         }, 2200);

  //         this.getSession(token.request_token).subscribe(
  //             (session: any) => {
  //               console.log(session);
  //               localStorage.setItem('session_id', session.session_id);

  //               this.getUserData(session.session_id).subscribe(
  //                 (user: any) => {
  //                   console.log(user);
  //                   localStorage.setItem('user_name', user.username);
  //                   localStorage.setItem('user_id', user.id);
  //                 },
  //                 err => console.log('error', err)
  //               );
  //             },
  //             err => console.log('error', err)
  //           );
  //         }
  //       },
  //       err => this.messagesService.messageAction(false)
  //     );
  //   });
  // }




  // login(username: string, password: string) {
    
  //   this.getToken()
  //     .pipe(
  //       concatMap((token: any) => { 
  //       console.log(token);                   

  //       return this.authenticationToken(token.request_token, username, password)
  //         .pipe(
  //           delay(2200), 
  //           concatMap((authentication: any) => {
  //             console.log(authentication);

  //             if (authentication.success) {
  //               localStorage.setItem('auth_token', token.request_token);
  //               this.loggedIn = true;
  //               this.messagesService.messageAction(true);           
  //               this.router.navigate(['/main']);
  //             } 

  //             return this.getSession(token.request_token)
  //               .pipe(
  //                 concatMap((session: any) => {
  //                   console.log(session);
  //                   localStorage.setItem('session_id', session.session_id);

  //                   return this.getUserData(session.session_id)
  //                     .pipe(
  //                       map((user: any) => {
  //                         console.log(user);
  //                         localStorage.setItem('user_name', user.username);
  //                         localStorage.setItem('user_id', user.id);
  //                       })
  //                     )
            
  //                 })
  //               )       

  //           })
  //         )

  //     })
  //   )

  //   .subscribe(res => {
  //     console.log(res)
  //   }),
  //   err => console.log(err);  
  // }



  login(username: string, password: string) {
    
    return this.getToken().pipe(
      concatMap((token: any) => { 
        console.log(token);     
        return this.authenticationToken(token.request_token, username, password);              
      }), 
      
      concatMap((token: any) => {
        console.log(token);
        localStorage.setItem('auth_token', token.request_token);
        return this.getSession(token.request_token);
      }),  
     
      concatMap((session: any) => {
        console.log(session);
        if (session.success) { 
          localStorage.setItem('session_id', session.session_id);        
          this.loggedIn = true;
          this.messagesService.messageAction(true); 
        }
        return this.getUserData(session.session_id).pipe(
          delay(2200),
          tap((user: any) => {
            console.log(user);
            if (session.success) { 
              localStorage.setItem('user_name', user.username);
              localStorage.setItem('user_id', user.id);
              this.router.navigate(['/main']);

            }
          })
        );  
      })
    ) 
    .subscribe((user: any) => {      
      console.log('result', user)    
    },
      err => this.messagesService.messageAction(false)
    ) 
  }

  
   
  




  logout() {
    this.loggedIn = false;

    this.removeSession(localStorage.getItem('session_id')).subscribe(res => {
      console.log(res);
    });

    this.router.navigate(['/login']);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('session_id');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');
  }
}

// 'artemo', 'cinemaart'
