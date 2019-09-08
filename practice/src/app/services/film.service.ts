import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCAL_CONFIG } from '../config/config-api';
import { ApiConfig } from '../models/api';
import { Subject, Observable, forkJoin } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private favoriteNumber$ = new Subject<number>();
  public favoriteList$ = new Subject<any>();
  public userId = localStorage.getItem('user_id');
  public sessionId = localStorage.getItem('session_id');
  public currentRouteValue: string;
  public currentPage: number;
  public currentValuePageFavorites: number;

  constructor(
    private http: HttpClient,
    @Inject(LOCAL_CONFIG) public localConfig: ApiConfig,
    private route: ActivatedRoute,
  ) { }


  public changefavoriteNumber(value) {
    this.favoriteNumber$.next(value);
  }

  public getfavoriteNumber(): Observable<number> {
    return this.favoriteNumber$.asObservable();
  }
  


  set currentPageFilms(value: number) {
    this.currentPage = value;
  }

  get currentPageFilms() {
    return this.currentPage || 1;
  }



  set currentPageFavorites(value: number) {
    this.currentValuePageFavorites = value;
  }

  get currentPageFavorites() {
    return this.currentValuePageFavorites || 1;
  }



  set currentRoute(value: any) {
    this.currentRouteValue = value;
  }

  get currentRoute() {
    return this.currentRouteValue;
  }


 

  public setFavoriteFilmsList(value: any) {
    this.favoriteList$.next(value);
  }

  public getFavoriteFilmsList(): Observable<any> {
    return this.favoriteList$.asObservable();
  }



  // http

  addFilmToFavorite(user_id, session_id, type, id, favorite) {
    return this.http.post(`${this.localConfig.accountUrl}/${user_id}/favorite?api_key=${this.localConfig.apiKey}&session_id=${session_id}`, { media_type: type, media_id: id, favorite: favorite });
  }

  getListOfFavotitesFilms(user_id, session_id, page?) {
    return this.http.get(`${this.localConfig.accountUrl}/${user_id}/favorite/movies?api_key=${this.localConfig.apiKey}&session_id=${session_id}&language=ru-RU&page=${page}`);
  }

  getPopularFilms(page?: number) {
    return this.http.get(`${this.localConfig.movieUrl}/popular${this.localConfig.params}&page=${page}`);
  }

  getFilmById(id?: number) {
    return this.http.get(`${this.localConfig.movieUrl}/${id}${this.localConfig.params}`);
  }

  getGenreFilm() {
    return this.http.get(`https://api.themoviedb.org/3/genre/movie/list${this.localConfig.params}`);
  }

  // ******
  getVideoById(id?: number) {
    return this.http.get(`${this.localConfig.movieUrl}/${id}/videos${this.localConfig.params}`);
  }

  getCastById(id?: number) {
    return this.http.get(`${this.localConfig.movieUrl}/${id}/credits${this.localConfig.params}`);
  }


  getFavoriteFilms(films, userId, sessionId) {
    return this.getListOfFavotitesFilms(userId, sessionId, this.currentPageFavorites).subscribe((favoriteFilms: any) => {
        let favorites = [];
        favoriteFilms.results.map(item => {
          favorites.push(item.id);
          films.map(item => {
            item.isFavorite = favorites.indexOf(item.id) > -1;
          });
        });
      }
    );
  }

  markFavorite(id, value, films, userId, sessionId) {
    this.addFilmToFavorite(userId, sessionId, 'movie', id, value).subscribe(res => { 
      this.getFavoriteFilms(films, userId, sessionId);
      this.getListOfFavotitesFilms(userId, sessionId, this.currentPageFavorites).subscribe((favorites: any) => {       
        this.setFavoriteFilmsList(favorites.results);
        return this.changefavoriteNumber(favorites.total_results);
      });
    });
  }

  // getFavorite(filmIds: Array<number>) {
  //   return this.http.get(`${this.localConfig.favoriteApiUrl}?filmIds=${filmIds.join(',')}`);
  // }
}
