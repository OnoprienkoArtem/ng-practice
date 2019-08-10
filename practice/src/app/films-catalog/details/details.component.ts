import { Component, OnInit, Inject } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { ActorService } from '../../services/actor.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Film } from '../../models/film';
import { LOCAL_CONFIG } from '../../config/config-api';
import { ApiConfig } from '../../models/api';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
  public spiner: boolean = true;
  public showDetails: boolean;
  public id: number;
  public film: any;
  public actor: any; 
  public actorKnownFor: any;

  constructor(
    public filmsService: FilmService,
    public actorService: ActorService,
    private router: Router,
    private route: ActivatedRoute,   
    @Inject(LOCAL_CONFIG) public localConfig: ApiConfig
  ) {}

  ngOnInit() {
    if (this.filmsService.currentRoute === undefined) {
      this.router.navigate(["/main"]);
    }  


    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get("id");       

      if (this.filmsService.currentRoute === `/films/details/${this.id}`) {         
        this.filmsService.getFilmById(this.id).subscribe(film => {
          this.film = film;          
          if (this.film) {
            this.spiner = false;
          }
        });
      } else {         
        this.actorService.getActorById(this.id).subscribe(actor => {
          this.actor = actor;
          console.log(this.actor);
          if (this.actor) {
            this.spiner = false;
          }
        }); 

        this.actorService.getPopularActors(this.actorService.currentPageActors).pipe(
          tap((res: any) => {  
            this.actorKnownFor = res.results.find(item => item.id === this.id);  
            console.log(this.actorKnownFor);
          })
        ).subscribe(
          (actorsList: any) => console.log('in subscribe', actorsList),
          err => console.log("error", err)
        )
      }
    });    

    this.showDetails = this.filmsService.currentRoute === `/films/details/${this.id}` ? true : false;
  }
}
