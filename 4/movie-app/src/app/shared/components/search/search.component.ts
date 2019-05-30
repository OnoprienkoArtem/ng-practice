import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilmService } from '../../../services/film.service';
import { Film } from '../../../models/film';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


  searchValue: string;
  // films: Film[];

  filmsClone = [];

  @Input('page') currentFilmsPage;
  @Input('data') films: Film[];
 

  @Output() updateSearchData = new EventEmitter<Film[]>();
  @Output() updateBtnShowElse = new EventEmitter<boolean>();

  constructor(private filmsService: FilmService) { }

  changeSearchValue() {
    this.filmsService.getPopularFilms().subscribe(
      (filmList: any) => {
        this.filmsClone = [...filmList.results];
        this.films = this.filmsClone.slice(0, this.currentFilmsPage);
      },
      err => console.log("error", err)
    )

 

    if (this.searchValue.length > 2) {
      this.films = this.films.filter(film => film.title.toLowerCase().includes(this.searchValue.toLowerCase()));
      this.updateBtnShowElse.emit(true);      
    } else {
      this.films;
      this.updateBtnShowElse.emit(false);
      if (this.films.length === this.filmsClone.length) {
        this.updateBtnShowElse.emit(true);   
      }
    }

    this.updateSearchData.emit(this.films);
  }

  ngOnInit() { }

}
