import { Component } from '@angular/core';
import { fadeAnimation } from './animations';
import { AuthService } from './services/auth.service';
import { flattenStyles } from '@angular/platform-browser/src/dom/dom_renderer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent {
  title = 'movie-app';
  isLogin = false;

  constructor(private authService: AuthService) {}

  links: any[] = [
    { path: '/main', label: 'Главная', active: 'button-active' },
    { path: '/films-list', label: 'Все фильмы', active: 'button-active' },
    { path: '/actors-list', label: 'Все актеры', active: 'button-active' }
  ];

  ngOnInit() {
    this.isLogin = this.authService.isLoggedIn();
    
  }




}
