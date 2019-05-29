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
  films: Film[];

  @Input('page') countPage;
  @Output() updateSearchData = new EventEmitter<Film[]>();


  constructor(private filmsService: FilmService) { }

  changeSearchValue() {
    // const curentFilmList = this.filmsService.getPartData(this.countPage);

    if (this.searchValue.length > 3) {
      console.log(this.searchValue);
    }
    // this.films = this.searchValue.length > 3
      // ? curentFilmList.filter(film => film.name.toLowerCase().includes(this.searchValue.toLowerCase()))
      // : curentFilmList;
    this.updateSearchData.emit(this.films);
  }

  ngOnInit() { }

}
