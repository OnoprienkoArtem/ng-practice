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

  filmsClone;

  @Input('page') currentFilmsPage;

  @Input('data') films;
  @Output() updateSearchData = new EventEmitter<Film[]>();


  constructor(private filmsService: FilmService) { }

  changeSearchValue() {

    console.log(this.currentFilmsPage);
    this.filmsService.getPopularFilms().subscribe(
      (filmList: any) => {
        this.filmsClone = [...filmList.results];
        this.films = this.filmsClone.slice(0, this.currentFilmsPage);
      },
      err => console.log("error", err)
    )

    if (this.searchValue.length > 2) {
      this.films = this.films.filter(film => film.title.toLowerCase().includes(this.searchValue.toLowerCase()))
    } else {
      this.films;
    }

    this.updateSearchData.emit(this.films);
  }

  ngOnInit() { }

}
