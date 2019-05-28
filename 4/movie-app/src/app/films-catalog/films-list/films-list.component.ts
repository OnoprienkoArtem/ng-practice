import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film';
import { log } from 'util';
@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnInit {

  isDisabled: boolean = false;
  public films: Film[];
  filmsClone;
  actorsClone;
  public actors: any[];
  private favoriteFilms: any = new Set();
  public countFavorite: number;
  public visibleContent: boolean = true;

  firstPage: number = 9;
  currentPage: number = this.firstPage;
  nextPageData: number;
  stepPage: number = 3;

  constructor(public filmsService: FilmService) {
    this.filmsService.getPopularFilms().subscribe(
      (filmList: any) => {
        this.filmsClone = [...filmList.results];
        this.films = this.filmsClone.slice(0, this.firstPage);
      },
      err => console.log("error", err)
    ),
    this.filmsService.getPopularActors().subscribe(
      (actorsList: any) => {        
        this.actorsClone = [...actorsList.results];   
        this.actors = this.actorsClone.slice(0, this.firstPage);    
      },
      err => {
        console.log("error", err);
      }
    )

   }

  ngOnInit() {}

  nextPage() {   
    this.nextPageData = this.currentPage + this.stepPage;    
    this.films = this.films.concat(this.filmsClone.slice(this.currentPage, this.nextPageData));
    this.currentPage += this.stepPage;        
    this.isDisabled = this.films.length  === this.filmsClone.length ? true : false; 
  }

  addFilmToFavorit(id) { 
    this.favoriteFilms.has(id) ? this.favoriteFilms.delete(id) : this.favoriteFilms.add(id);    
    this.countFavorite = this.favoriteFilms.size;      
  }

  updateData(data) {
    this.visibleContent = data === 'Actors' ? false : true;    
  }

 




}
