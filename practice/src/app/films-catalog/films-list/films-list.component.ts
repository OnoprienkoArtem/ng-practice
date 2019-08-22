import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnInit {
  private totalPages: number;
  private page: number = 1;
  public spiner: boolean = true;
  public isDisabledFilmsBtn: boolean = false;
  public films: Film[] = [];
  private userId = localStorage.getItem('user_id');
  private sessionId = localStorage.getItem('session_id');

  constructor(public filmsService: FilmService) { }

  ngOnInit() {
    this.getOnePagePopularFilms(this.page);
  }

  getOnePagePopularFilms(page) {





    this.filmsService.getPopularFilms(page).subscribe(
      (filmList: any) => {
        this.totalPages = filmList.total_pages;

        this.films = filmList.results;

        let result = [];

        const genreIds = filmList.results.map(item => {

          this.filmsService.getGenreFilm().subscribe(
            (genreIds: any) => {
              // item.genre_ids === genreIds

              // console.log(item.genre_ids);
              // console.log(genreIds);
              item.genre_ids.map(item => {

                // item === genreIds.genres
                genreIds.genres.find(i => {
                  // console.log(i);
                  // console.log(item);
                  i == item;
                  result.push(i);

                })

                // result.push(genreIds.genres.name);
              })
            })
        })

        console.log(result);

        // console.log(genreIds);

        // console.log(this.films);

        this.filmsService.getFavoriteFilms(this.films, this.userId, this.sessionId);

        if (this.films) {
          this.spiner = false;
        }
      },
      err => console.log('error', err)
    );
  }

  public nextFilmsPage() {
    this.page++;
    this.getOnePagePopularFilms(this.page);
    this.isDisabledFilmsBtn = this.page === this.totalPages ? true : false;
  }

  public addFilmToFavorit(id: number) {
    const favoriteFilms = this.films.find(item => item.id === id);

    if (favoriteFilms.isFavorite) {
      this.filmsService.markFavorite(id, false, this.films, this.userId, this.sessionId);
    } else {
      this.filmsService.markFavorite(id, true, this.films, this.userId, this.sessionId);
    }
  }
}
