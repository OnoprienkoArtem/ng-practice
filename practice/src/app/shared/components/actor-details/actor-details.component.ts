import { Component, OnInit, Input, Inject } from '@angular/core';
import { LOCAL_CONFIG } from '../../../config/config-api';
import { ApiConfig } from '../../../models/api';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { FilmService } from '../../../services/film.service';

@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.scss']
})
export class ActorDetailsComponent implements OnInit {

  public imgUrl: string = this.localConfig.midImgPath; 
  public midBackPath: string = this.localConfig.midBackPath; 
  public smallImgPath: string = this.localConfig.smallImgPath;  
  mode = 'determinate';

  public currentActorsPage;

  @Input('data') actor: any;

  constructor(
    @Inject(LOCAL_CONFIG) public localConfig: ApiConfig,
    private router: Router,
    public filmsService: FilmService,
    ) { }

  ngOnInit() {
    this.getPage();

  }

  public actors;


  getPage() {
    this.filmsService.getState().subscribe((n) => {
      console.log(n);
      return this.currentActorsPage = n;      
    });
  }

  backOnAllActor() {


    // this.filmsService.getPopularActors(1).subscribe(
    //   (actorsList: any) => {
    //     // console.log(actorsList);       
    //     this.actors = actorsList.results;     
    //   }    
    // ) 

    // console.log(this.actors);
    console.log(this.currentActorsPage);
    console.log(this.getPage());
    this.router.navigate(["/actors"]);
    
  }

}
