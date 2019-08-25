import { Component, OnInit, Input, Inject } from '@angular/core';
import { Actor } from '../../../models/actor';
import { LOCAL_CONFIG } from '../../../config/config-api';
import { ApiConfig } from '../../../models/api';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { FilmService } from '../../../services/film.service';
import { ActorService } from '../../../services/actor.service';
@Component({
  selector: 'app-actor-item',
  templateUrl: './actor-item.component.html',
  styleUrls: ['./actor-item.component.scss']
})
export class ActorItemComponent implements OnInit {

  imgUrl: string = this.localConfig.midImgPath;

  @Input('data') actor: any;

  constructor(@Inject(LOCAL_CONFIG) public localConfig: ApiConfig,
    public actorService: ActorService,
    public filmsService: FilmService,
    private router: Router) { }

  ngOnInit() {

    // console.log(this.actor);
    // console.log(this.actor.known_for);
    this.actorService.knownFor = this.actor.known_for;
  }

  getDetails() {
    this.router.navigate(['/actors/details', this.actor.id]);
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) this.filmsService.currentRoute = event.url;
    });
  }

}
