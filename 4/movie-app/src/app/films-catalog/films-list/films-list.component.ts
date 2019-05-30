import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film';


@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnInit {

  public spiner: boolean = true;

  public isDisabledFilmsBtn: boolean = false;

  public films: Film[];
  private filmsClone;

  private firstFilmsPage: number = 9;
  public currentFilmsPage: number = this.firstFilmsPage;
  private nextPageFilms: number;
  private stepFilmsPage: number = 3;


  public isDisabledActorsBtn: boolean = false;

  public actors: any[];
  private actorsClone;

  private firstActorsPage: number = 8;
  private currentActorsPage: number = this.firstActorsPage;
  private nextPageActors: number;
  private stepActorsPage: number = 4;


  public visibleContent: boolean = true;


  private favoriteFilms: any = new Set();
  public countFavorite: number;


  constructor(public filmsService: FilmService) {
    this.filmsService.getPopularFilms().subscribe(
      (filmList: any) => {
        this.filmsClone = [...filmList.results];
        this.films = this.filmsClone.slice(0, this.firstFilmsPage);   

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
        this.actorsClone = [...actorsList.results];   
        this.actors = this.actorsClone.slice(0, this.firstActorsPage);    
      },
      err => {
        console.log("error", err);
      }
    )
  }

  ngOnInit() {
    
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
  

 

  addFilmToFavorit(id) { 
    this.favoriteFilms.has(id) ? this.favoriteFilms.delete(id) : this.favoriteFilms.add(id);    
    this.countFavorite = this.favoriteFilms.size;      
  }

  updateData(data) {
    this.visibleContent = data === 'Actors' ? false : true;    
  }

  searchData(data) {    
    this.films = data;
  }

  updateBtn(event) {
    this.isDisabledFilmsBtn = event;
    if (this.films.length === this.filmsClone.length) {
      this.isDisabledFilmsBtn = true;
    }    
  }




}
