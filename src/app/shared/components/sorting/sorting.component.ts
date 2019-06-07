import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent implements OnInit {

  @Output() updateSortingData = new EventEmitter<String[]>();

  sortingTypes = [
    { value: 'Films', choice: 'Фильмы' },
    { value: 'Actors', choice: 'Актеры' },   
  ];

  constructor() { }

  sortByType({ value }) {
    this.updateSortingData.emit(value);
  }

  ngOnInit() {
  }

}
