import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
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
  private userId = localStorage.getItem('user_id');
  private sessionId = localStorage.getItem('session_id');

  @Input('data') actor: any;
  // @Input() actorKnownFor: any;  
  @Output() updateListOfFavorite = new EventEmitter<number>();

  constructor(
    @Inject(LOCAL_CONFIG) public localConfig: ApiConfig,
    private router: Router,
    public filmsService: FilmService,
    private _location: Location
  ) { }

  ngOnInit() {
    console.log('actor details', this.actor);

    // console.log(this.actor.knownFor.known_for);
    // this.filmsService.getFavoriteFilms(this.actor.knownFor.known_for, this.userId, this.sessionId);
  }

  public addFilmToFavorit(id: number) {
    const favoriteFilms = this.actor.knownFor.known_for.find(item => item.id === id);

    if (favoriteFilms.isFavorite) {
      this.filmsService.markFavorite(id, false, this.actor.knownFor.known_for, this.userId, this.sessionId);
    } else {
      this.filmsService.markFavorite(id, true, this.actor.knownFor.known_for, this.userId, this.sessionId);
    }
  }

  public backOnAllActor() {
    this._location.back();
  }

}
