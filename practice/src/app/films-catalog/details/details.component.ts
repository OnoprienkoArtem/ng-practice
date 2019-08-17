import { Component, OnInit, Inject } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { ActorService } from '../../services/actor.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Film } from '../../models/film';
import { LOCAL_CONFIG } from '../../config/config-api';
import { ApiConfig } from '../../models/api';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { tap, map, switchMap, concatMap } from 'rxjs/operators';

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
  public __id : number;

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

    this.__id = this.route.snapshot.params.id;

    console.log('__id', +this.__id);


    return this.route.paramMap.pipe(
      concatMap((params: ParamMap) => {  
        this.id = +params.get("id");
        return this.filmsService.getCastById(this.id);
      }),
      concatMap((params: ParamMap) => {  
        this.id = +params.get("id");
        return this.filmsService.getVideoById(this.id).pipe(
          tap(res => res)
        );
      })


    ).subscribe((res: any) => {
      // this.film = res;
      console.log(res);  
    });  

    











    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get("id");       

      if (this.filmsService.currentRoute === `/films/details/${this.id}`) { 
          
        // forkJoin(
        //   this.filmsService.getCastById(this.__id),
        //   this.filmsService.getVideoById(this.__id),
        //   this.filmsService.getFilmById(this.__id)
        // ).subscribe((res: any) => {
        //   this.film = res;    

        //   // {
        //   //   people: res[0],
        //   //   trailer: res[1],
        //   //   deteils: res[2]
        //   // }
        //   console.log(res); 
        //   console.log(this.film);   
        // });




        // let cast = this.filmsService.getCastById(this.__id).pipe(tap(res => res));
        // let video = this.filmsService.getVideoById(this.__id).pipe(tap(res => res));
        // let film = this.filmsService.getFilmById(this.__id).pipe(tap(res => res));

        // this.film = forkJoin([cast, video, film]).subscribe(results => {
        //   return results;
        //   console.log('--------------->', results);
        // });



        // this.filmsService.getCastById(this.id).subscribe((cast: any) => {
        //   // console.log(cast);
        //   this.cast = cast.cast; 
        //   this.crew = cast.crew;
        // });

        // this.filmsService.getVideoById(this.id).subscribe((video: any) => {
        //   // console.log(video);
        //   this.video = video.results; 
        // });    

        // this.filmsService.getFilmById(this.id).subscribe(film => {            
        //   this.film = film;          
        //   if (this.film) {
        //     this.spiner = false;
        //   }
        // });
       
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
