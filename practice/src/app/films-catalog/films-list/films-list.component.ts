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
  public totalResult: number;
  public spiner: boolean = true;
  public isDisabledFilmsBtn: boolean = false;
  public films: Film[] = [];
  private userId = localStorage.getItem('user_id');
  private sessionId = localStorage.getItem('session_id');


 
  public total = 10;
  public pagePag: number;
  public limit = 1;

  constructor(public filmsService: FilmService) { }

  ngOnInit() {
    this.getOnePagePopularFilms(this.filmsService.currentPageFilms);

    console.log(this.pagePag);
  }

  getOnePagePopularFilms(page) {

    this.filmsService.getPopularFilms(page).subscribe(
      (filmList: any) => {
        console.log(filmList);
        this.totalPages = filmList.total_pages;


        // for pagination
        this.total = filmList.total_pages;
        this.pagePag = filmList.page;
       

        this.page = filmList.page;
        this.totalResult = filmList.total_results;
        this.films = filmList.results;
        this.filmsService.getFavoriteFilms(this.films, this.userId, this.sessionId);

        if (this.films) {
          this.spiner = false;
        }
      },
      err => console.log('error', err)
    );
  }

  // public nextFilmsPage() {
  //   this.page++;
  //   this.getOnePagePopularFilms(this.page);
  //   this.isDisabledFilmsBtn = this.page === this.totalPages ? true : false;
  // }

  public addFilmToFavorit(id: number) {
    const favoriteFilms = this.films.find(item => item.id === id);

    if (favoriteFilms.isFavorite) {
      this.filmsService.markFavorite(id, false, this.films, this.userId, this.sessionId);
    } else {
      this.filmsService.markFavorite(id, true, this.films, this.userId, this.sessionId);
    }
  }




  firstPage() {
    this.getOnePagePopularFilms(1);
    this.filmsService.currentPageFilms = 1;
  }

  lastPage() {
    this.getOnePagePopularFilms(500);
    this.filmsService.currentPageFilms = 500;
  }

  goToPage(page: number): void {   
    this.getOnePagePopularFilms(page);
    this.filmsService.currentPageFilms = page;
  }

  onNext(): void {
    this.page++;
    this.getOnePagePopularFilms(this.page);
    this.filmsService.currentPageFilms = this.page;
  }

  onPrev(): void {
    this.page--;
    this.getOnePagePopularFilms(this.page);
    this.filmsService.currentPageFilms = this.page;
  }




}
