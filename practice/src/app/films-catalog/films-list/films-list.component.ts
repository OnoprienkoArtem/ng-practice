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
  
  private firstFilmsPage: number = 9;
  private nextPageFilms: number;
  private stepFilmsPage: number = 3;

  public spiner: boolean = true;
  public isDisabledFilmsBtn: boolean = false;
  public films: Film[] = [];
  public filmsClone: any[] = [];
  public currentFilmsPage: number = this.firstFilmsPage;
  public visibleContent: boolean = true;
  public countFavorite: number;  
  
  constructor(public filmsService: FilmService) { }

  ngOnInit() { 
    this.filmsService.getPopularFilms().subscribe(
        (filmList: any) => {   
          this.filmsClone = filmList.results;          
          this.films = this.filmsClone.slice(0, this.firstFilmsPage);  
          this.getFavorite();
          this.getBookmark();
          if (this.filmsClone) {          
              this.spiner = false;       
          }
        },
        err => console.log("error", err)
    ) 
  }

  public nextFilmsPage() {   
    this.nextPageFilms = this.currentFilmsPage + this.stepFilmsPage;    
    this.films = this.films.concat(this.filmsClone.slice(this.currentFilmsPage, this.nextPageFilms)); 
    this.currentFilmsPage += this.stepFilmsPage;        
    this.isDisabledFilmsBtn = this.films.length  === this.filmsClone.length ? true : false; 
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
    const favoriteFilms = this.films.find(item => {
      return item.id === id;
    });

    if (favoriteFilms.isFavorite) {     
      this.filmsService.removeFromFavorite(id).subscribe(() => this.getFavorite());
    } else {     
      this.filmsService.addToFavorite(id).subscribe(() => this.getFavorite());
    }           
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
