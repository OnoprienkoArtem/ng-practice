import { Component, OnInit, Inject } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { ActorService } from '../../services/actor.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Film } from '../../models/film';
import { LOCAL_CONFIG } from '../../config/config-api';
import { ApiConfig } from '../../models/api';
import { Observable, Subscription, forkJoin, of } from 'rxjs';
import { tap, map, switchMap, concatMap, delay } from 'rxjs/operators';

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
  public video: any;
  public cast: any;
  public crew: any;
  

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

    this.id = this.route.snapshot.params.id;

    if (this.filmsService.currentRoute === `/films/details/${this.id}`) {  
          
      forkJoin(
        this.filmsService.getCastById(this.id),
        this.filmsService.getVideoById(this.id).pipe(map((res: any) => res.results)),
        this.filmsService.getFilmById(this.id)
      ).subscribe((res: any) => {
        this.film = {
          people: res[0],
          trailer: res[1],
          deteils: res[2]
        }
        this.spinerOff(this.film);     
      });  
       
      } else {  

        // this.actorService.getActorById(this.id).subscribe(actor => {
        //   this.actor = actor;
        //   console.log(this.actor);
        //   this.spinerOff(this.actor);       
        // }); 

        // this.actorService.getPopularActors(this.actorService.currentPageActors).pipe(
        //   tap((res: any) => {  
        //     this.actorKnownFor = res.results.find(item => item.id === this.id);  
        //     console.log(this.actorKnownFor);
        //   })
        // ).subscribe((actorsList: any) => console.log('in subscribe', actorsList))


      forkJoin(
        this.actorService.getActorById(this.id),
        this.actorService.getPopularActors(this.actorService.currentPageActors)
        .pipe(
          tap((res: any) => {  
            console.log(res.results);

            this.actorKnownFor = res.results.find(item => {
              item.id === this.id
              return item.id
            }
            );     
                   
          })
        )      
      ).subscribe((res: any) => {
       console.log(this.actorKnownFor);  
        this.actor = {
          deteils: res[0],
          knownFor: this.actorKnownFor
        }
        console.log(this.actor);

        this.spinerOff(this.actor);     
      }); 
      }
   

    this.showDetails = this.filmsService.currentRoute === `/films/details/${this.id}` ? true : false;
  }


  public spinerOff(obj) {
    if (obj){
      this.spiner = false;  
    } 
  }



  
}
