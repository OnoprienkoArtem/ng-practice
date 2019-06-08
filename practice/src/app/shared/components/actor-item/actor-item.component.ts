import { Component, OnInit, Input } from '@angular/core';
import { FilmService } from '../../../services/film.service';
import { Actor } from '../../../models/actor';
@Component({
  selector: 'app-actor-item',
  templateUrl: './actor-item.component.html',
  styleUrls: ['./actor-item.component.scss']
})
export class ActorItemComponent implements OnInit {

  imgUrl: string = this.filmsService.midImgPath;

  @Input('data') actor: Actor;

  constructor(public filmsService: FilmService) { }

  ngOnInit() {
  }

}
