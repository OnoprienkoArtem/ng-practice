import { Component } from '@angular/core';
import { fadeAnimation } from './animations';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent {
  title = 'movie-app';
  isLogin = true;
  currentRoute: string;

  constructor(private router: Router) {}

  links: any[] = [
    { path: '/main', label: 'Главная', active: 'button-active' },
    { path: '/films-list', label: 'Все фильмы', active: 'button-active' },
    { path: '/actors-list', label: 'Все актеры', active: 'button-active' }
  ];

  ngOnInit() {
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = event.url;
          this.isLogin = this.currentRoute === '/login' ? false : true;               
        }
      });
    
  }




}
