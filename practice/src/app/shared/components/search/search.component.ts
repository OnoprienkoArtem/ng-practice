import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../../../services/search.service';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { FilmService } from '../../../services/film.service';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchValue: string;
  currentRoute: string;
  placeholder: string;

  constructor(
    public filmsService: FilmService,
    private router: Router,
    public searchServic: SearchService,
    public activatedRoute: ActivatedRoute
  ) {

  }

  changeSearchValue() {
    if (!this.searchValue) {
      this.router.navigate(['/main']);
    } else {
      this.router.navigate(['/search-result']);
      this.searchServic.search = { searchValue: this.searchValue, currentRoute: this.currentRoute };
    }
  }

  setPlaceholder(path) {
    switch (path) {
      case '/films':
        this.placeholder = 'Поиск фильмов'
        break;
      case '/actors':
        this.placeholder = 'Поиск актеров'
        break;
      case '/favorites':
        this.placeholder = 'Поиск в избранном'
        break;
      default:
        this.placeholder = 'Поиск ...'
        break;
    }
  }

  ngOnInit() {
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = event.url;
          this.setPlaceholder(this.currentRoute);
        }
      });


  }

}
