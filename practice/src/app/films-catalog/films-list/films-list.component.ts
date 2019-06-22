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

  public searchTitle: string = 'Поиск по фильмам';

  public spiner: boolean = true;

  public isDisabledFilmsBtn: boolean = false;

  public films: Film[] = [];
  public filmsClone: any[] = [];

  private firstFilmsPage: number = 9;
  public currentFilmsPage: number = this.firstFilmsPage;
  private nextPageFilms: number;
  private stepFilmsPage: number = 3;

  public visibleContent: boolean = true;


  private favoriteFilms: any = new Set();
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

  nextFilmsPage() {   
    this.nextPageFilms = this.currentFilmsPage + this.stepFilmsPage;    
    this.films = this.films.concat(this.filmsClone.slice(this.currentFilmsPage, this.nextPageFilms)); 
    this.currentFilmsPage += this.stepFilmsPage;        
    this.isDisabledFilmsBtn = this.films.length  === this.filmsClone.length ? true : false; 
    this.getFavorite();
    this.getBookmark();
  }



  getFavorite() {    
    this.filmsService.getFavorite(this.films.map(item => item.id)).subscribe((favorites: Array<Favorite>) => {         
      const favoriteList = favorites.map(favorite => favorite._id);      
      this.films.map(item => {
        item.isFavorite = favoriteList.indexOf(item.id) > -1;
      })
    })  
  }

  addFilmToFavorit(id: number) { 
    const favoriteFilms = this.films.find(item => {
      return item.id === id;
    });

    if (favoriteFilms.isFavorite) {     
      this.filmsService.removeFromFavorite(id).subscribe(() => this.getFavorite());
    } else {     
      this.filmsService.addToFavorite(id).subscribe(() => this.getFavorite());
    }           
  }

  getBookmark() {
    this.filmsService.getBookmark(this.films.map(item => item.id)).subscribe((bookmarks: Array<Bookmark>) => {
      const bookedList = bookmarks.map(bookmark => bookmark._id);
      this.films.map(item => {
        item.isBooked = bookedList.indexOf(item.id) > -1;
      })
    })
  }

  addFilmToBookmark(id: number) {  
    const bookmarkFilms = this.films.find(item => {
      return item.id === id;
    });

    if (bookmarkFilms.isBooked) {
      this.filmsService.removeFromBookmark(id).subscribe(() => this.getBookmark());
    } else {
      this.filmsService.addToBookmark(id).subscribe(() => this.getBookmark());
    }
  }

  updateData(data) {    
    if (data === 'Actors') {
      this.visibleContent = false;
      this.searchTitle = 'Поиск по актерам';
    } else {
      this.visibleContent = true; 
      this.searchTitle = 'Поиск по фильмам';
    }        
  }

  searchDataByFilms(dataSearch) {
    this.films = this.filmsClone;
    if (dataSearch.length > 2) {
      this.films = this.films.filter(film => film.title.toLowerCase().includes(dataSearch.toLowerCase()));
      this.isDisabledFilmsBtn = true;
    } else {
      this.isDisabledFilmsBtn = false;
      if (this.films.length === this.filmsClone.length) {
        this.isDisabledFilmsBtn = true;
      }
    }
  }



  // searchData(dataSearch) {  
  //   if (this.visibleContent) {
  //     this.searchDataByFilms(dataSearch);
  //   } else {
  //     this.searchDataByActors(dataSearch);
  //   }   
  // }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }


}
