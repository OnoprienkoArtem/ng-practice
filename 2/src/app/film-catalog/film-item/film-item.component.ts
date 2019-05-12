import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Film } from '../film';

@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css']
})
export class FilmItemComponent implements OnInit {

  @Input('data') film: Film;
  @Output() updateCounter = new EventEmitter<any>();
  @Output() reduceCounter = new EventEmitter<any>();

  filmId;
  isFavor;


  constructor() { }

  addToFavorites(filmId) {
    this.film.isFavorite = !this.film.isFavorite;
    this.updateCounter.emit(filmId);
    
    console.log(filmId, 'filmObj from FilmItem');
  }

  ngOnInit() { } 

}
