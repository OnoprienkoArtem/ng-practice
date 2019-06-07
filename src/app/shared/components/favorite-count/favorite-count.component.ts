import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-favorite-count',
  templateUrl: './favorite-count.component.html',
  styleUrls: ['./favorite-count.component.scss']
})
export class FavoriteCountComponent implements OnInit {

  @Input('favorite') countFavorite;

  constructor() { }

  ngOnInit() {
  }

}
