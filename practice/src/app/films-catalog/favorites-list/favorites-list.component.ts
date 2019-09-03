import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent implements OnInit {

  public totalPages: number;
  public totalResult: number;
  public page: number = 1;
  public spinner: boolean = true;
  public isDisabledFilmsBtn: boolean = false;
  public films: Film[] = [];
  private userId = localStorage.getItem('user_id');
  private sessionId = localStorage.getItem('session_id');


  constructor(
    public filmsService: FilmService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getOnePagePopularFilms(this.page);

  }

  getOnePagePopularFilms(page) {
    this.filmsService.getListOfFavotitesFilms(this.userId, this.sessionId).subscribe((favorites: any) => {
      console.log(favorites);
      this.filmsService.getFavoriteFilmsList().subscribe(
        res => {
          this.films = res;
          console.log(res);
        }
      );

      this.totalResult = favorites.total_results;
      this.totalPages = favorites.total_pages;
      this.films = favorites.results;

      if (this.films) {
        this.spinner = false;
      }

      if (this.totalPages === favorites.total_pages) {
        this.isDisabledFilmsBtn = true;
      }
    })

  }

  public nextFilmsPage() {
    this.page++;
    this.getOnePagePopularFilms(this.page);
    this.isDisabledFilmsBtn = this.page === this.totalPages ? true : false;
  }

  public addFilmToFavorit(id: number) {
    // const favoriteFilms = this.films.find(item => item.id === id);


    this.filmsService.markFavorite(id, false, this.films, this.userId, this.sessionId);
    // this.getOnePagePopularFilms(this.page);
    this.filmsService.getFavoriteFilmsList().subscribe(
      res => {
        console.log(res);
      }
    );
    // this.filmsService.getFavoriteFilms(this.films, this.userId, this.sessionId);
    // console.log(this.films);

  }

}
