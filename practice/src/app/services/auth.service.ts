import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private authUrl = 'https://reqres.in/api';
  private loggedIn = false;

  constructor(private http: HttpClient, public router: Router) {   
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  isLoggedIn() {
    return this.loggedIn;
  }




  getToken() {
    return this.http.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=f7ce96b08789255f247db434150c7493`);
  }

  login(username: string, password: string) {   
    console.log(username, password);
        //     this.filmsService.bindingTokenWithAccount(token.request_token, 'artemo', 'cinemaart').subscribe(
        //   res => console.log(res)
        // );

        // this.http.get(`https://api.themoviedb.org/3/authentication/token/validate_with_login?username=${username}&password=${password}&request_token=${requst_token}&api_key=f7ce96b08789255f247db434150c7493`);



    this.getToken().subscribe(
      (token: any) => {
        console.log(token.request_token);

        return this.http.get(`https://api.themoviedb.org/3/authentication/token/validate_with_login?username=${username}&password=${password}&request_token=${token.request_token}&api_key=f7ce96b08789255f247db434150c7493`)
          .subscribe(
            ((authentication: any) => {
              console.log(authentication.success);

            if (authentication) {            
              // localStorage.setItem('auth_token', res.token);
              //     this.loggedIn = true;
            }

            })
          )


      }
    )


    // return this.http.post(`${this.authUrl}/login`, { username, password })
    //   .pipe(
        
    //     tap(res => {
    //       console.log();
          
    //       if (res.token) {            
    //         localStorage.setItem('auth_token', res.token);
    //         this.loggedIn = true;
    //       }
    //     }),
    //   );
  }

  logout() {
    this.loggedIn = false;
    this.router.navigate(['/login']); 
    localStorage.removeItem('auth_token');    
  }
}

