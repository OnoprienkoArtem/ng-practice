import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent implements OnInit {
  private userId = localStorage.getItem('user_id');
  private sessionId = localStorage.getItem('session_id');
  public totalPages: number;
  public totalResult$: Observable<number>; 
  public totalResult: number;
  public page: number;
  public spinner: boolean = true; 
  public films: Film[] = [];


  constructor(public filmsService: FilmService) { }

  ngOnInit() {   
    this.getOnePagePopularFilms(this.filmsService.currentPageFavorites);    
    this.totalResult$.subscribe(res => {
      this.totalResult = res;     
    })
  }

  public getOnePagePopularFilms(page) {
    this.filmsService.getListOfFavotitesFilms(this.userId, this.sessionId, page).subscribe((favorites: any) => {
      console.log(favorites);

      this.filmsService.getFavoriteFilmsList().subscribe(res => this.films = res);
      this.page = favorites.page;
      this.filmsService.changefavoriteNumber(favorites.total_results);
      this.totalPages = favorites.total_pages;
      this.films = favorites.results;

      if (this.films) {
        this.spinner = false;
      }        
    })
    this.totalResult$ = this.filmsService.getfavoriteNumber(); 
  }

  public removeFilmFromFavorit(id: number) {
    this.filmsService.markFavorite(id, false, this.films, this.userId, this.sessionId);  
    this.filmsService.getFavoriteFilmsList().subscribe(res => {
        console.log(res);
      }
    );    
  }

  public goToPage(page: number): void {
    this.getOnePagePopularFilms(page);
    this.filmsService.currentPageFavorites = page;
  }

  public onNext(): void {
    this.page++;
    this.getOnePagePopularFilms(this.page);
    this.filmsService.currentPageFavorites = this.page;
  }

  public onPrev(): void {
    this.page--;
    this.getOnePagePopularFilms(this.page);
    this.filmsService.currentPageFavorites = this.page;
  }

}
