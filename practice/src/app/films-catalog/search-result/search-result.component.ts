import { Component, OnInit, Inject } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { LOCAL_CONFIG } from '../../config/config-api';
import { ApiConfig } from '../../models/api';
import { Router } from '@angular/router';

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

  constructor(
    public filmsService: FilmService, 
    @Inject(LOCAL_CONFIG) public localConfig: ApiConfig,
    private router: Router
  ) { }

  pageCount: number = 1; 
  totalPages: number;

  ngOnInit() {
    if (!this.filmsService.search) this.router.navigate(['/main']);    

    this.filmsService.getItemsBySearch(this.filmsService.search, this.pageCount).subscribe(  
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
    this.filmsService.getItemsBySearch(this.filmsService.search, this.pageCount).subscribe(
      (res: any) => {    
        this.searchItems = res.results;
      },
      err => console.log("error", err)
    )
  }



}
