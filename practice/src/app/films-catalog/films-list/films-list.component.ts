import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film';

import { Favorite } from '../../models/favorites';
import { Bookmark } from '../../models/bookmark';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnInit {
  
  private totalPages: number;
  private page: number = 1;
  public spiner: boolean = true;
  public isDisabledFilmsBtn: boolean = false;
  public films: Film[] = [];
 
  private userId = localStorage.getItem('user_id');
  private sessionId = localStorage.getItem('session_id');
    
  
  constructor(public filmsService: FilmService) { }

  ngOnInit() { 
    this.getOnePagePopularFilms(this.page);
  }

  getOnePagePopularFilms(page) {
    this.filmsService.getPopularFilms(page).subscribe(
      (filmList: any) => { 
        this.totalPages = filmList.total_pages;       
        this.films = filmList.results;

        this.filmsService.getFavoriteFilms(this.films);
       

        if (this.films) {
          this.spiner = false;
        }
      },
      err => console.log("error", err)
    )
  }

  public nextFilmsPage() {   
    this.page++;
    this.getOnePagePopularFilms(this.page);
    this.isDisabledFilmsBtn = this.page === this.totalPages ? true : false; 
 
  }





  public addFilmToFavorit(id: number) {  
    const favoriteFilms = this.films.find(item => {
      return item.id === id;
    });

    if (favoriteFilms.isFavorite) {
      this.filmsService.markFavorite(id, false, this.films);
      // this.getFavorite();

      // this.filmsService.addFilmToFavorite(this.userId, this.sessionId, "movie", id, false).subscribe(
      //   res => {
      //     console.log(res);
      //     this.getFavorite();
   
      //     this.filmsService.getListOfFavotitesFilms(this.userId, this.sessionId).subscribe (
      //       (favorites: any) => {               
      //         this.filmsService.changefavoriteNumber(favorites.total_results);
      //       }
      //     )
  
      //   }
      // ); 
    } else {
      this.filmsService.markFavorite(id, true, this.films);
      // this.getFavorite();
      // this.filmsService.addFilmToFavorite(this.userId, this.sessionId, "movie", id, true).subscribe(
      //   res => {
      //     console.log(res);
      //     this.getFavorite();
   
      //     this.filmsService.getListOfFavotitesFilms(this.userId, this.sessionId).subscribe (
      //       (favorites: any) => {               
      //         this.filmsService.changefavoriteNumber(favorites.total_results);
      //       }
      //     )
  
      //   }
      // ); 
    }

         
  }





}
