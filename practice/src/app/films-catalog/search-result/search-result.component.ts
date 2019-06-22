import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  public spiner: boolean = true;
  public searchItems: any[] = [];
  public imgUrl: string = this.filmsService.midImgPath;
  public totalResalt: number;

  constructor(public filmsService: FilmService) { }

  pageCount: number = 1; 
  totalPages: number;

  ngOnInit() {
    this.filmsService.getItemsBySearch(this.filmsService.search, this.pageCount).subscribe(  
      (res: any) => {
        console.log(res.results); 
        console.log(res); 
        this.searchItems = res.results;
        this.totalResalt = res.total_results;
        this.totalPages = res.total_pages;
        if (this.searchItems) {
          this.spiner = false;
        }    
      },
      err => console.log("error", err)
    )
  }

  nextPage() {
    this.pageCount++;
    this.filmsService.getItemsBySearch(this.filmsService.search, this.pageCount).subscribe(
      (res: any) => {
        console.log(res.results);
        console.log(res);
        this.searchItems = res.results;
        this.totalResalt = res.total_results;
        if (this.searchItems) {
          this.spiner = false;
        }
      },
      err => console.log("error", err)
    )
  }



}
