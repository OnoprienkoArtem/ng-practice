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
    { value: 'DESC', choice: 'от Я до А' }
  ];  
  
  constructor(private filmsService: FilmService) {   
  }
  
  ngOnInit() { 
    this.films = this.filmsService.getAll();
  }

  compare(current, next) {
    const currentItem: any = current.name.toLowerCase();
    const nextItem: any = next.name.toLowerCase();
    return currentItem > nextItem ? 1 : -1;
  }

  mySort(films, value) {
    if (value === 'ASC') {
      return films.sort(this.compare);
    }
    return films.sort(this.compare).reverse();
  }


  addFilmObj() {    
    this.filmFiltered = this.films.filter(film => film.isFavorite);
    this.countElement = this.filmFiltered.length;
  }


  
}
