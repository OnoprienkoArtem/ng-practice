import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movie-app';

  links: any[] = [
    { path: '/main', label: 'Главная', active: 'button-active', icon: 'home' },
    { path: '/films-list', label: 'Все фильмы', active: 'button-active', icon: 'list_alt' }
  ];
}
