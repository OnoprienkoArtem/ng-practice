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

  private totalPages: number;
  private page: number = 1;
  public spinner: boolean = true;
  public isDisabledFilmsBtn: boolean = false;
  public films: Film[] = [];


  constructor(
    public filmsService: FilmService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getOnePagePopularFilms(this.page);

    console.log('in favorites', this.filmsService.currentRoute);




  }

  getOnePagePopularFilms(page) {

    const userId = localStorage.getItem('user_id');
    const sessionId = localStorage.getItem('session_id');
    this.filmsService.getListOfFavotitesFilms(userId, sessionId).subscribe((favorites: any) => {
      console.log(favorites);
      this.totalPages = favorites.total_pages;
      this.films = favorites.results;
      if (this.films) {
        this.spinner = false;
      }
      if (this.totalPages === favorites.total_pages) {
        this.isDisabledFilmsBtn = true;
      }
    }
    )
  }

  public nextFilmsPage() {
    this.page++;
    this.getOnePagePopularFilms(this.page);
    this.isDisabledFilmsBtn = this.page === this.totalPages ? true : false;
  }

}
