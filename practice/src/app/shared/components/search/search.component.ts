import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FilmService } from '../../../services/film.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchValue: string; 

  
 
  
  constructor(public filmsService: FilmService, private router: Router) { }

  changeSearchValue() {    
    console.log(this.searchValue);
    if (!this.searchValue ) {    
      this.router.navigate(['/main']);
    } else {
      this.router.navigate(['/search-result']);     
      this.filmsService.search = this.searchValue;
    }    
  }

  ngOnInit() {}

}
