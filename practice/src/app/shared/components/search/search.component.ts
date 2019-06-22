import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchValue: string; 

  @Output() updateSearchData = new EventEmitter<string>();  
 
  
  constructor() { }

  changeSearchValue() {    
    this.updateSearchData.emit(this.searchValue);
  }

  ngOnInit() {}

}
