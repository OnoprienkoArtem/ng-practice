import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film';
@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnInit {

  films: Film[];

  constructor(public filmsService: FilmService) { }

  ngOnInit() {
    this.filmsService.getPopularFilms().subscribe(
      (filmList: any) => {
        console.log(filmList.results);

        this.films = filmList.results;
        console.log(`${this.filmsService.midImgPath}${filmList.results[2].poster_path}`)
      },
      err => {
        console.log("error", err);
      })
  }

}
