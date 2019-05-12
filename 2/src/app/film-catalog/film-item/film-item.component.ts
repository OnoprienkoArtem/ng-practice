import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Film } from '../film';

@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css']
})
export class FilmItemComponent implements OnInit {

  @Input('data') film: Film;
  @Input() favorite;
  @Output() favorEmit = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  favoriteToggle() {
    this.favorite = !this.favorite;
    this.favorEmit.emit({ id: this.id, favorite: this.favorite });
  }

  get id() { return this.film.id; }

}
