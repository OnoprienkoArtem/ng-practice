import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../../../services/search.service';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { FilmService } from '../../../services/film.service';


import { map } from 'rxjs/operators';
import { log } from 'util';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchValue: string; 
  currentUrl: string;
  placeholder: string;
  
  constructor(
    public filmsService: FilmService, 
    private router: Router,
    public searchServic: SearchService,
    public activatedRoute: ActivatedRoute    
  ) {
    console.log(this.router.url);
    
   }

  changeSearchValue() { 
    if (!this.searchValue ) {    
      this.router.navigate(['/main']);
    } else {
      this.router.navigate(['/search-result']);     
      this.searchServic.search = this.searchValue;
    }    
  }

  setPlaseholder(path) {
    switch (path) {
      case '/films-list':
        this.placeholder = 'Поиск фильмов'
        break;
      case '/actors-list':
        this.placeholder = 'Поиск актеров'
        break;
      default:
        this.placeholder = 'Поиск ...'
        break;
    }
  }

  search = new Subject<any>();
  searchObserver$ = this.search.asObservable();

  resetSearch = new Subject<any>();
  resetSearchObserver$ = this.resetSearch.asObservable();


  ngOnInit() {
    
    // this.router.events.subscribe(
    //   (event: any) => {
    //   if (event instanceof NavigationEnd) {  
    //     this.setPlaseholder(event.url);  
    //     this.search.next(this.searchValue);
    //   }      
    // });
 

 
  }

}
