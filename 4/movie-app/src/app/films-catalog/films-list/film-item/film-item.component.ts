import { Component, OnInit, Input } from '@angular/core';
import { Film } from '../../../models/film';
@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.scss']
})
export class FilmItemComponent implements OnInit {

  @Input('data') film: any;

  constructor() { }

  ngOnInit() {
    console.log(this.film);
  }

}
