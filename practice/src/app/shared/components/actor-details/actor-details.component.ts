import { Component, OnInit, Input, Inject } from '@angular/core';
import { LOCAL_CONFIG } from '../../../config/config-api';
import { ApiConfig } from '../../../models/api';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FilmService } from '../../../services/film.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.scss']
})
export class ActorDetailsComponent implements OnInit {

  public imgUrl: string = this.localConfig.midImgPath;
  public midBackPath: string = this.localConfig.midBackPath;
  public smallImgPath: string = this.localConfig.smallImgPath;
  public mode = 'determinate';

  @Input('data') actor: any;
  // @Input() actorKnownFor: any;  

  constructor(
    @Inject(LOCAL_CONFIG) public localConfig: ApiConfig,
    private router: Router,
    public filmsService: FilmService,
    private _location: Location
  ) { }

  ngOnInit() {
    console.log(this.actor);
  }


  backOnAllActor() {
    this._location.back();
  }

}
