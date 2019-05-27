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

  public films: Film[];
  public actors: any[];
  private favoriteFilms: any = new Set();
  public countFavorite: number;

  constructor(public filmsService: FilmService) { }

  ngOnInit() {    
    this.filmsService.getPopularFilms().subscribe(
      (filmList: any) => {
        // console.log(filmList.results);
        this.films = filmList.results.splice(0, 6);
        // console.log(`${this.filmsService.midImgPath}${filmList.results[2].poster_path}`)
      },
      err => {
        console.log("error", err);
      }
    );

    this.filmsService.getPopularActors().subscribe(
      (actorsList: any) => {
        // console.log(filmList.results);
        this.actors = actorsList.results;
        // console.log(`${this.filmsService.midImgPath}${filmList.results[2].poster_path}`)
      },
      err => {
        console.log("error", err);
      }
    )
  }

  addFilmToFavorit(id) { 
    this.favoriteFilms.has(id) ? this.favoriteFilms.delete(id) : this.favoriteFilms.add(id);    
    this.countFavorite = this.favoriteFilms.size;      
  }




}
