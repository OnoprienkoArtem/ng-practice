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
  private totalPages: number;
  private pages: number = 1;
  public spiner: boolean = true;
  public isDisabledActorsBtn: boolean = false;

  constructor(public filmsService: FilmService) {

    
   }

  ngOnInit() {
    this.getOnePagePopularActors(this.pages);
  }

  getOnePagePopularActors(page) {
    this.filmsService.getPopularActors(page).subscribe(
      (actorsList: any) => {
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
