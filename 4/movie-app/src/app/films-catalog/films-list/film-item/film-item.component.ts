import { Component, OnInit, Input } from '@angular/core';
import { FilmService } from '../../../services/film.service';
import { Film } from '../../../models/film';
@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.scss']
})
export class FilmItemComponent implements OnInit {

  @Input('data') film: any;
  imgUrl: string = this.filmsService.midImgPath;
  

  constructor(public filmsService: FilmService) { }

  ngOnInit() {
    console.log(this.film);
  }

}
