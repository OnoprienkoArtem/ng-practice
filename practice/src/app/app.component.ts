import { Component } from '@angular/core';
import { fadeAnimation } from './animations';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { FilmService } from './services/film.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent { 
  public isLogin = true;
  private currentRoute: string;
  public username: string;

  constructor(
    private authService: AuthService, 
    public router: Router,
    public filmsService: FilmService
  ) {}

  links: any[] = [
    { path: '/main', label: 'Главная', active: 'button-active', page: 'main' },
    { path: '/films', label: 'Все фильмы', active: 'button-active', page: 'films' },
    { path: '/actors', label: 'Все актеры', active: 'button-active', page: 'currentPageActors' }
  ];

  ngOnInit() {
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = event.url;
          this.isLogin = this.currentRoute === '/login' ? false : true;     
          if (this.isLogin) {            
            this.username = localStorage.getItem('user_name');;            
          }
         
        }
      }
    );

  //  console.log(localStorage.getItem('user_name'));
    // console.log(this.authService.userData);
    


    
  }

  logout() {  
    this.authService.logout();
  }

  clearPageCounter(page) {
    this.filmsService[page] = 1;
  }

}
