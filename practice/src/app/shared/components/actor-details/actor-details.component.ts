import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.scss']
})
export class ActorDetailsComponent implements OnInit {

   @Input('data') actor: any;

  constructor() { }

  ngOnInit() {
  }

}
