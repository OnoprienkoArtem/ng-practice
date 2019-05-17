import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FilmService } from '../film.service';
import { Film } from '../film';

@Component({
  selector: '.films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {

  countElement = 0;
  films: Film[];
  filmFiltered: Film[];

  states = [
    { value: 'ASC', choice: 'от А до Я' },
    { value: 'DESC', choice: 'от Я до А' },
    { value: 'Def', choice: 'По умолчанию' },
  ];  
  
  constructor(private filmsService: FilmService) {   
  }
  
  ngOnInit() { 
    this.films = this.filmsService.getAll();
  }



  mySort(value) { 
    switch (value) {
      case 'ASC': return this.films.sort(this.filmsService.compareSorting);
      case 'DESC': return this.films.sort(this.filmsService.compareSorting).reverse();
      case 'Def': return this.films = this.filmsService.getAll();
    }   
  }


  addFilmToFavorit() {    
    this.filmFiltered = this.films.filter(film => film.isFavorite);
    this.countElement = this.filmFiltered.length;
  }


  
}
