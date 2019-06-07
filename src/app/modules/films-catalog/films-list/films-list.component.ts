import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../../services/film.service';
import { Film } from '../../../models/film';

@Component({
  selector: '.films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {

  countFavorite = 0;
  films: Film[];
  filmFavorite: Film[];
  countPage = 6; 
  
  constructor(private filmsService: FilmService) {  
  }  

  updateData(data) {
    this.films = data;
  }

  addFilmToFavorit() {    
    this.filmFavorite = this.films.filter(film => film.isFavorite);    
    this.countFavorite = this.filmFavorite.length;
  }

  isDisabled() {
    if (this.countPage === this.filmsService.getAll().length) return true;
  }

  nextPage() {
    this.countPage += 3;
    this.films = this.filmsService.getPartData(this.countPage);
  }

  ngOnInit() { 
    this.films = this.filmsService.getPartData(this.countPage);
    this.addFilmToFavorit();  
  }  

}
