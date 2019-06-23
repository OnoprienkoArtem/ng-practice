import { Component, OnInit, Input, Inject } from '@angular/core';
import { Actor } from '../../../models/actor';
import { LOCAL_CONFIG } from '../../../config/config-api';
import { ApiConfig } from '../../../models/api';
@Component({
  selector: 'app-actor-item',
  templateUrl: './actor-item.component.html',
  styleUrls: ['./actor-item.component.scss']
})
export class ActorItemComponent implements OnInit {

  imgUrl: string = this.localConfig.midImgPath;

  @Input('data') actor: Actor;

  constructor(@Inject(LOCAL_CONFIG) public localConfig: ApiConfig) { }

  ngOnInit() {
  }

}
