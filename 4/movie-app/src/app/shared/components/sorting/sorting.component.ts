import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent implements OnInit {

  sortingTypes = [
    { value: 'Films', choice: 'Фильмы' },
    { value: 'Actors', choice: 'Актеры' },   
  ];

  constructor() { }

  ngOnInit() {
  }

}
