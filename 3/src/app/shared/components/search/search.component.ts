import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FilmService } from '../../../services/film.service';
import { Film } from '../../../models/film';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchValue: string;  
  films: Film[]; 

  @Input('page') countPage;
  @Output() updateSearchData = new EventEmitter<Film[]>();

  constructor(private filmsService: FilmService) { }

  changeSearchValue() {    
    const curentFilmList = this.filmsService.getAll().slice(0, this.countPage);    
    console.log(this.searchValue);
    this.films = this.searchValue.length > 3
      ? curentFilmList.filter(film => film.name.toLowerCase().includes(this.searchValue.toLowerCase()))
      : curentFilmList;  
    this.updateSearchData.emit(this.films);
  }


  ngOnInit() {
  }

}
