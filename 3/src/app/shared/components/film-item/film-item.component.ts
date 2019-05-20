import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Film } from '../../../models/film';

@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css']
})
export class FilmItemComponent implements OnInit {

  @Input('data') film: Film;
  @Output() updateCounter = new EventEmitter<Film>();

  constructor() { }

  addToFavorites() {
    this.film.isFavorite = !this.film.isFavorite;
    this.updateCounter.emit();
  }

  ngOnInit() { } 

}
