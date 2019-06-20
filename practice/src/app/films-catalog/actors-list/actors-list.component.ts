import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { Actor } from '../../models/actor';

@Component({
  selector: 'app-actors-list',
  templateUrl: './actors-list.component.html',
  styleUrls: ['./actors-list.component.scss']
})
export class ActorsListComponent implements OnInit {

  public actors: Actor[] = [];
  private actorsClone: any[] = [];

  private firstActorsPage: number = 8;
  private currentActorsPage: number = this.firstActorsPage;
  private nextPageActors: number;
  private stepActorsPage: number = 4;

  public isDisabledActorsBtn: boolean = false;

  constructor(public filmsService: FilmService) { }

  ngOnInit() {
    this.filmsService.getPopularActors().subscribe(
      (actorsList: any) => {
        this.actorsClone = actorsList.results;
        this.actors = this.actorsClone.slice(0, this.firstActorsPage);
      },
      err => console.log("error", err)
    ) 
  }

  nextActorsPage() {
    this.nextPageActors = this.currentActorsPage + this.stepActorsPage;
    this.actors = this.actors.concat(this.actorsClone.slice(this.currentActorsPage, this.nextPageActors));
    this.currentActorsPage += this.stepActorsPage;
    this.isDisabledActorsBtn = this.actors.length === this.actorsClone.length ? true : false;
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

}
