import { Component, OnInit } from '@angular/core';
import { ActorService } from '../../services/actor.service';
import { Actor } from '../../models/actor';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-actors-list',
  templateUrl: './actors-list.component.html',
  styleUrls: ['./actors-list.component.scss']
})
export class ActorsListComponent implements OnInit {

  public actors: Actor[] = [];
  public spinner: boolean = true;
  
  public totalPages: number;
  public isDisabledActorsBtn: boolean = false;
  public totalResult: number;
  public pageCount: number;

  constructor(
    public actorService: ActorService,
    private route: ActivatedRoute, ) {
  }

  ngOnInit() {
    this.getOnePagePopularActors(this.actorService.currentPageActors);
  }

  getOnePagePopularActors(page) {
    this.actorService.getPopularActors(page).subscribe(
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
    this.actorService.currentPageActors = this.pageCount;
  }

  firstPage() {
    this.actorService.currentPageActors = 1;
    this.getOnePagePopularActors(1);
  }



}
