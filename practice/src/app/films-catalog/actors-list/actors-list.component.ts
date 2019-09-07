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
  public page: number;

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
        this.page = actorsList.page;
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





  public goToPage(page: number): void {
    this.getOnePagePopularActors(page);
    this.actorService.currentPageActors = page;
  }

  public onNext(): void {
    this.page++;
    this.getOnePagePopularActors(this.page);
    this.actorService.currentPageActors = this.page;
  }

  public onPrev(): void {
    this.page--;
    this.getOnePagePopularActors(this.page);
    this.actorService.currentPageActors = this.page;
  }



}
