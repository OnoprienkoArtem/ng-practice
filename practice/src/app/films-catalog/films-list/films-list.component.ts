import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film';

import { Favorite } from '../../models/favorites';
import { Bookmark } from '../../models/bookmark';

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
 
  
    
  
  constructor(public filmsService: FilmService) { }

  ngOnInit() { 
    this.getOnePagePopularFilms(this.page);
  }

  getOnePagePopularFilms(page) {
    this.filmsService.getPopularFilms(page).subscribe(
      (filmList: any) => { 
        this.totalPages = filmList.total_pages;       
        this.films = filmList.results;
        // this.getFavorite();
        // this.getBookmark();
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
    this.getFavorite();
    this.getBookmark();
  }



  private getFavorite() {    
    this.filmsService.getFavorite(this.films.map(item => item.id)).subscribe((favorites: Array<Favorite>) => {         
      const favoriteList = favorites.map(favorite => favorite._id);      
      this.films.map(item => {
        item.isFavorite = favoriteList.indexOf(item.id) > -1;
      })
    })  
  }

  public addFilmToFavorit(id: number) { 
    console.log(id);

    const userId = localStorage.getItem('user_id');
    const sessionId = localStorage.getItem('session_id');


    this.filmsService.addFilmToFavorite(userId, sessionId, "movie", id, true).subscribe(
      res => {
        console.log(res);
      }
    );

    // const favoriteFilms = this.films.find(item => {
    //   return item.id === id;
    // });

    // if (favoriteFilms.isFavorite) {     
    //   this.filmsService.removeFromFavorite(id).subscribe(() => this.getFavorite());
    // } else {     
    //   this.filmsService.addToFavorite(id).subscribe(() => this.getFavorite());
    // }           
  }




  private getBookmark() {
    this.filmsService.getBookmark(this.films.map(item => item.id)).subscribe((bookmarks: Array<Bookmark>) => {
      const bookedList = bookmarks.map(bookmark => bookmark._id);
      this.films.map(item => {
        item.isBooked = bookedList.indexOf(item.id) > -1;
      })
    })
  }

  public addFilmToBookmark(id: number) {  
    const bookmarkFilms = this.films.find(item => {
      return item.id === id;
    });

    if (bookmarkFilms.isBooked) {
      this.filmsService.removeFromBookmark(id).subscribe(() => this.getBookmark());
    } else {
      this.filmsService.addToBookmark(id).subscribe(() => this.getBookmark());
    }
  }

  ngOnDestroy() {
   
  }


}
