import { Component, OnInit, Inject } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { LOCAL_CONFIG } from '../../config/config-api';
import { ApiConfig } from '../../models/api';
import { Router } from '@angular/router';
import { log } from 'util';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  public spiner: boolean = true;
  public searchItems: any[] = [];
  public imgUrl: string = this.localConfig.midImgPath;
  public totalResalt: number;
  public isDisabledActorsBtn: boolean = false;
  public searchFor: string;

  constructor(    
    @Inject(LOCAL_CONFIG) public localConfig: ApiConfig,
    private router: Router,
    public searchServic: SearchService,

  ) { }

  pageCount: number = 1; 
  totalPages: number;

  ngOnInit() {    
    if (!this.searchServic.search.searchValue) this.router.navigate(['/main']); 

    switch (this.searchServic.search.currentRoute) {
      case '/films-list':
        this.typeOfSearch('movie');
        break;
      case '/actors-list':
        this.typeOfSearch('person');
        break;        
      default:
        this.typeOfSearch('multi');
        break;
    }
  }

  typeOfSearch(type) {    
    this.searchFor = type;
    this.getSearchedList(this.searchFor, this.searchServic.search.searchValue, this.pageCount);   
  }

  getSearchedList(searchFor, searchValue, page) {
    this.searchServic.getSearchFilms(searchFor, searchValue, page).subscribe(
      (res: any) => {
        this.searchItems = res.results;
        this.totalResalt = res.total_results;
        this.totalPages = res.total_pages;
        if (this.pageCount === this.totalPages) this.isDisabledActorsBtn = true;
        if (this.searchItems) {
          this.spiner = false;
        }
      },
      err => console.log("error", err)
    )
  }

  nextPage() {
    this.pageCount++; 
    if (this.pageCount === this.totalPages) this.isDisabledActorsBtn = true;    
    this.getSearchedList(this.searchFor, this.searchServic.search.searchValue, this.pageCount);
  }



}
