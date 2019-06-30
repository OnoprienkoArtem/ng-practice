import { Component } from '@angular/core';
import { fadeAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent {
  title = 'movie-app';

  links: any[] = [
    { path: '/main', label: 'Главная', active: 'button-active' },
    { path: '/films-list', label: 'Все фильмы', active: 'button-active' },
    { path: '/actors-list', label: 'Все актеры', active: 'button-active' }
  ];



  
}
