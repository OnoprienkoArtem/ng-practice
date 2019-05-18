import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FilmService } from '../../../services/film.service';
import { Film } from '../../../models/film';

@Component({
  selector: '.films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {

  countElement = 0;
  films: Film[];
  filmFiltered: Film[];
  sortingTypes = [
    { value: 'ASC', choice: 'от А до Я' },
    { value: 'DESC', choice: 'от Я до А' },
    { value: 'DEFAULT', choice: 'По умолчанию' },
  ];  
  
  countPage = 6;
  
  constructor(private filmsService: FilmService) {}  

  mySort(value) { 
    switch (value) {
      case 'ASC': return this.films.sort(this.filmsService.compareSorting);
      case 'DESC': return this.films.sort(this.filmsService.compareSorting).reverse();
      case 'DEFAULT': return this.films = this.filmsService.getAll().slice(0, this.countPage);
    }   
  }

  addFilmToFavorit() {    
    this.filmFiltered = this.films.filter(film => film.isFavorite);    
    this.countElement = this.filmFiltered.length;
  }

  ngOnInit() { 
    this.films = this.filmsService.getAll().slice(0, this.countPage);   
  }  

  isDisabled() {
    if (this.countPage === this.filmsService.getAll().length) return true;
  }

  nextPage() {
    this.countPage += 3;
    this.films = this.filmsService.getAll().slice(0, this.countPage);
  }


}
