import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Film } from '../../../models/film';
import { LOCAL_CONFIG } from '../../../config/config-api';
import { ApiConfig } from '../../../models/api';

@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.scss']
})
export class FilmItemComponent implements OnInit {

  imgUrl: string = this.localConfig.midImgPath; 

  @Input('data') film: Film;
  @Output() updateListOfFavorite = new EventEmitter<number>();
  @Output() updateListOfBooked = new EventEmitter<number>();  

  constructor(@Inject(LOCAL_CONFIG) public localConfig: ApiConfig) { }

  ngOnInit() {}

  addToFavorites() {   
    this.updateListOfFavorite.emit(this.film.id);
  }

  addToBooked() {
    this.updateListOfBooked.emit(this.film.id);
  }

}
