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
  public totalPages: number;
  public spinner: boolean = true;
  public isDisabledActorsBtn: boolean = false;
  public totalResult: number;
  public pageCount: number;

  constructor(
    public filmsService: FilmService,
    private route: ActivatedRoute, ) {
  }

  ngOnInit() {
    this.getOnePagePopularActors(this.filmsService.currentPageActors);
  }

  getOnePagePopularActors(page) {
    this.filmsService.getPopularActors(page).subscribe(
      (actorsList: any) => {
        console.log(actorsList);
        this.pageCount = actorsList.page;
        this.totalPages = actorsList.total_pages;
        this.actors = actorsList.results;
        this.totalResult = actorsList.total_results;

        if (this.actors) {
          this.spinner = false;
        }
      },
      err => console.log("error", err)
    )
  }

  nextActorsPage() {
    this.pageCount++;
    this.getOnePagePopularActors(this.pageCount);
    this.isDisabledActorsBtn = this.pageCount === this.totalPages ? true : false;
    this.filmsService.currentPageActors = this.pageCount;
  }

  firstPage() {
    this.filmsService.currentPageActors = 1;
    this.getOnePagePopularActors(1);
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
