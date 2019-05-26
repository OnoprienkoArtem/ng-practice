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

 

  @Input('data') film: any;
  @Output() updateListOfFavorite = new EventEmitter<Object>();
  

  constructor(public filmsService: FilmService) { }

  ngOnInit() {
    // console.log(this.film);
  }

  addToFavorites() {
    this.film.isFavorite = !this.film.isFavorite;
    this.updateListOfFavorite.emit(this.film.id);
  }

}
