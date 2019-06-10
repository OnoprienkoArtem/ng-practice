import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film';
import { Actor } from '../../models/actor';
import { Favorite } from '../../models/favorites';

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


  public isDisabledActorsBtn: boolean = false;

  public actors: Actor[] = [];
  private actorsClone: any[] = [];

  private firstActorsPage: number = 8;
  private currentActorsPage: number = this.firstActorsPage;
  private nextPageActors: number;
  private stepActorsPage: number = 4;


  public visibleContent: boolean = true;


  private favoriteFilms: any = new Set();
  public countFavorite: number;  
  
  constructor(public filmsService: FilmService) { }

  ngOnInit() { 
    this.filmsService.getPopularFilms().subscribe(
        (filmList: any) => {   
          this.filmsClone = filmList.results;          
          this.films = [...this.filmsClone];  
          this.getFavorite();
          if (this.filmsClone) {
            setTimeout(() => {
              this.spiner = false;
            }, 2000);
          }
        },
        err => console.log("error", err)
    ),

    this.filmsService.getPopularActors().subscribe(
      (actorsList: any) => {
        this.actorsClone = actorsList.results;      
        this.actors = this.actorsClone.slice(0, this.firstActorsPage);
      },
      err => console.log("error", err)    
    )   

    
  }

  nextFilmsPage() {   
    this.nextPageFilms = this.currentFilmsPage + this.stepFilmsPage;    
    this.films = this.films.concat(this.filmsClone.slice(this.currentFilmsPage, this.nextPageFilms));   
    this.currentFilmsPage += this.stepFilmsPage;        
    this.isDisabledFilmsBtn = this.films.length  === this.filmsClone.length ? true : false; 
  }

  nextActorsPage() {
    this.nextPageActors = this.currentActorsPage + this.stepActorsPage;
    this.actors = this.actors.concat(this.actorsClone.slice(this.currentActorsPage, this.nextPageActors));
    this.currentActorsPage += this.stepActorsPage;
    this.isDisabledActorsBtn = this.actors.length === this.actorsClone.length ? true : false;
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

  searchDataByActors(dataSearch) {
    this.actors = this.actorsClone;
    if (dataSearch.length > 2) {
      this.actors = this.actors.filter(actor => actor.name.toLowerCase().includes(dataSearch.toLowerCase()));
      this.isDisabledActorsBtn = true;
    } else {
      this.isDisabledActorsBtn = false;
      if (this.actors.length === this.actorsClone.length) {
        this.isDisabledActorsBtn = true;
      }
    }
  }

  searchData(dataSearch) {  
    if (this.visibleContent) {
      this.searchDataByFilms(dataSearch);
    } else {
      this.searchDataByActors(dataSearch);
    }   
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }


}
