import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FilmService } from '../../../services/film.service';
import { Film } from '../../../models/film';

@Component({
  selector: 'app-sorting-items',
  templateUrl: './sorting-items.component.html',
  styleUrls: ['./sorting-items.component.css']
})
export class SortingItemsComponent implements OnInit {

  sortingTypes = [
    { value: 'ASC', choice: 'от А до Я' },
    { value: 'DESC', choice: 'от Я до А' },
    { value: 'DEFAULT', choice: 'По умолчанию' },
  ];

  @Input('data') films;
  @Input('page') countPage;
  @Output() updateSortingData = new EventEmitter<Film[]>();

  constructor(private filmsService: FilmService) { }

  ngOnInit() {   
  }

  sortByType({ value }) {    
    switch (value) {
      case 'ASC': return this.updateSortingData.emit(this.films.sort(this.filmsService.compareSorting));
      case 'DESC': return this.updateSortingData.emit(this.films.sort(this.filmsService.compareSorting).reverse());
      case 'DEFAULT': return this.updateSortingData.emit(this.films = this.filmsService.getPartData(this.countPage));
    }   
  }

}
