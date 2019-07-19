import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { Actor } from '../../models/actor';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-actors-list',
  templateUrl: './actors-list.component.html',
  styleUrls: ['./actors-list.component.scss']
})
export class ActorsListComponent implements OnInit {

  public actors: Actor[] = [];
  private totalPages: number;
  private pages: number;
  public spiner: boolean = true;
  public isDisabledActorsBtn: boolean = false;

  currentPage: number;

  constructor(
    public filmsService: FilmService,
    private route: ActivatedRoute,) {
  }

  ngOnInit() {
    console.log(this.filmsService.currentPageActors);
    this.pages = this.filmsService.currentPageActors
    this.getOnePagePopularActors(this.pages);
  }

  getOnePagePopularActors(page) {
    this.filmsService.getPopularActors(page).subscribe(
      (actorsList: any) => {
        // console.log(actorsList);
        this.totalPages = actorsList.total_pages;
        this.actors = actorsList.results;
        if (this.actors) {
          this.spiner = false;
        }
      },
      err => console.log("error", err)
    ) 
  }

  nextActorsPage() {
    this.pages++;    
    this.getOnePagePopularActors(this.pages);    
    this.isDisabledActorsBtn = this.pages === this.totalPages ? true : false; 
    this.filmsService.currentPageActors = this.pages;
  } 

  // searchDataByActors(dataSearch) {
  //   this.actors = this.actorsClone;
  //   if (dataSearch.length > 2) {
  //     this.actors = this.actors.filter(actor => actor.name.toLowerCase().includes(dataSearch.toLowerCase()));
  //     this.isDisabledActorsBtn = true;
  //   } else {
  //     this.isDisabledActorsBtn = false;
  //     if (this.actors.length === this.actorsClone.length) {
  //       this.isDisabledActorsBtn = true;
  //     }
  //   }
  // }

}
