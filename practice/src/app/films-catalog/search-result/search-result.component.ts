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

  constructor(public filmsService: FilmService) { }

  ngOnInit() {
    this.filmsService.getItemsBySearch(this.filmsService.search).subscribe(  
      (res: any) => {
        console.log(res.results); 
        console.log(res); 
        this.searchItems = res.results;

        if (this.searchItems) {
          this.spiner = false;
        }    
      },
      err => console.log("error", err)
    )

  }

}
