import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilmService } from '../../../services/film.service';
import { Film } from '../../../models/film';
@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.scss']
})
export class FilmItemComponent implements OnInit {

  imgUrl: string = this.filmsService.midImgPath;

 

  @Input('data') film: Film;
  @Output() updateListOfFavorite = new EventEmitter<number>();
  

  constructor(public filmsService: FilmService) { }

  ngOnInit() {}

  addToFavorites() {
    this.film.isFavorite = !this.film.isFavorite;
    this.updateListOfFavorite.emit(this.film.id);
  }

}
