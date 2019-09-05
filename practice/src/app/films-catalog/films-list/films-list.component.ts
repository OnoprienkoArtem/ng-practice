import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnInit {
  private userId = localStorage.getItem('user_id');
  private sessionId = localStorage.getItem('session_id'); 

  public totalPages: number;
  public page: number = 1;
  public totalResult: number;
  public spiner: boolean = true;

  
  public films: Film[] = [];
 
  

 

  constructor(public filmsService: FilmService) { }

  ngOnInit() {
    this.getOnePagePopularFilms(this.filmsService.currentPageFilms);
  }

  getOnePagePopularFilms(page) {
    this.filmsService.getPopularFilms(page).subscribe(
      (filmList: any) => {    
        this.totalPages = filmList.total_pages;
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

  public addFilmToFavorit(id: number) {
    const favoriteFilms = this.films.find(item => item.id === id);

    if (favoriteFilms.isFavorite) {
      this.filmsService.markFavorite(id, false, this.films, this.userId, this.sessionId);
    } else {
      this.filmsService.markFavorite(id, true, this.films, this.userId, this.sessionId);
    }
  }

  public goToPage(page: number): void {   
    this.getOnePagePopularFilms(page);
    this.filmsService.currentPageFilms = page;
  }

  public onNext(): void {
    this.page++;
    this.getOnePagePopularFilms(this.page);
    this.filmsService.currentPageFilms = this.page;
  }

  public onPrev(): void {
    this.page--;
    this.getOnePagePopularFilms(this.page);
    this.filmsService.currentPageFilms = this.page;
  }
}
