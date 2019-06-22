import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film';
import { Actor } from '../../models/actor';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public spiner: boolean = true;
  public imgUrl: string = this.filmsService.midImgPath; 
  public films: Film[] = [];
  public filmsClone: any[] = [];
  public actors: Actor[] = [];
  private actorsClone: any[] = [];

  constructor(private filmsService: FilmService) { }

  ngOnInit() {
    this.filmsService.getPopularFilms().subscribe(
      (filmList: any) => {
        this.filmsClone = filmList.results;
        this.films = this.filmsClone.slice(0, 6);  
        if (this.filmsClone) {
          this.spiner = false;
        }
      },
      err => console.log("error", err)
    ),
    
      this.filmsService.getPopularActors().subscribe(
        (actorsList: any) => {
          this.actorsClone = actorsList.results;
          this.actors = this.actorsClone.slice(0, 6);
          if (this.actorsClone) {
          this.spiner = false;
        }
      },
      err => console.log("error", err)
    )
  }

}
