import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../../../services/search.service';
import { Router } from '@angular/router';
import { FilmService } from '../../../services/film.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchValue: string; 
  
  constructor(
    public filmsService: FilmService, 
    private router: Router,
    public searchServic: SearchService
  ) { }

  changeSearchValue() { 
    if (!this.searchValue ) {    
      this.router.navigate(['/main']);
    } else {
      this.router.navigate(['/search-result']);     
      this.searchServic.search = this.searchValue;
    }    
  }

  ngOnInit() {}

}
