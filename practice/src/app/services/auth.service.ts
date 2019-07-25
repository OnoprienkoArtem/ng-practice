import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';

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


  public message: boolean;
  private state$ = new Subject<boolean>()

  public successMessage() {
    this.message = true;
    this.state$.next(this.message);
  }

  public errorMessage() {
    this.message = false;
    this.state$.next(this.message);
  }

  public getState(): Observable<boolean> {
    return this.state$.asObservable();
  }



  getToken() {
    return this.http.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=f7ce96b08789255f247db434150c7493`);
  }

  bindingTokenWithAccount(requst_token: string, username: string, password: string) {
    return this.http.get(`https://api.themoviedb.org/3/authentication/token/validate_with_login?username=${username}&password=${password}&request_token=${requst_token}&api_key=f7ce96b08789255f247db434150c7493`);
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

        this.bindingTokenWithAccount(token.request_token, username, password).subscribe(
          (authentication: any) => {
            console.log(authentication.success);
  
            if (authentication.success) {            
              localStorage.setItem('auth_token', token.request_token);
              this.loggedIn = true;
              this.successMessage();
              setTimeout(() => {            
                this.router.navigate(['/main']);
              }, 2000);
            }

          },
          (err) => {
            console.log(err.ok);
            this.errorMessage();
          }
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

