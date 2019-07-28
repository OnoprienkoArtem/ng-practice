import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent implements OnInit {

  private totalPages: number;
  private page: number = 1;
  public spiner: boolean = true;
  public isDisabledFilmsBtn: boolean = false;
  public films: Film[] = [];

  constructor(public filmsService: FilmService) { }

  ngOnInit() {
    this.getOnePagePopularFilms(this.page);
  }

  getOnePagePopularFilms(page) {

    const userId = localStorage.getItem('user_id');
    const sessionId = localStorage.getItem('session_id');
    this.filmsService.getListOfFavotitesFilms(userId, sessionId).subscribe((favorites: any) => {                    
        // this.filmsService.changefavoriteNumber(favorites.total_results);
        console.log(favorites);
        this.totalPages = favorites.total_pages;       
        this.films = favorites.results;  
        if (this.films) {
          this.spiner = false;
        }
      }
    )
            
    // this.filmsService.getPopularFilms(page).subscribe(
    //   (filmList: any) => { 
    //     this.totalPages = filmList.total_pages;       
    //     this.films = filmList.results;

    //     // this.getFavorite();
       

    //     if (this.films) {
    //       this.spiner = false;
    //     }
    //   },
    //   err => console.log("error", err)
    // )
    
  }

  public nextFilmsPage() {   
    this.page++;
    this.getOnePagePopularFilms(this.page);
    this.isDisabledFilmsBtn = this.page === this.totalPages ? true : false;  
  }

}
