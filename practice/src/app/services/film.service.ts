import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCAL_CONFIG } from '../config/config-api';
import { ApiConfig } from '../models/api';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private favoriteNumber$ = new Subject<number>();
  private userId = localStorage.getItem('user_id');
  private sessionId = localStorage.getItem('session_id');
  public currentPage: number;
  public currentRouteValue: string;

  constructor(
    private http: HttpClient,
    @Inject(LOCAL_CONFIG) public localConfig: ApiConfig
  ) { }


  public changefavoriteNumber(value) {
    this.favoriteNumber$.next(value);
  }

  public getfavoriteNumber(): Observable<number> {
    return this.favoriteNumber$.asObservable();
  }


  set currentPageActors(value: number) {
    this.currentPage = value;
  }

  get currentPageActors() {
    return this.currentPage || 1;
  }


  set currentRoute(value: any) {
    this.currentRouteValue = value;
  }

  get currentRoute() {
    return this.currentRouteValue;
  }




  // http

  addFilmToFavorite(user_id, session_id, type, id, favorite) {
    return this.http.post(`${this.localConfig.accountUrl}/${user_id}/favorite?api_key=${this.localConfig.apiKey}&session_id=${session_id}`, { media_type: type, media_id: id, favorite: favorite });
  }

  getListOfFavotitesFilms(user_id, session_id) {
    return this.http.get(`${this.localConfig.accountUrl}/${user_id}/favorite/movies?api_key=${this.localConfig.apiKey}&session_id=${session_id}&language=ru-RU`);
  }

  getPopularFilms(page?: number) {
    return this.http.get(`${this.localConfig.movieUrl}/popular${this.localConfig.params}&page=${page}`);
  }

  getFilmById(id?: number) {
    return this.http.get(`${this.localConfig.movieUrl}/${id}${this.localConfig.params}`);
  }

  getPopularActors(page?: number) {
    return this.http.get(`${this.localConfig.personUrl}/popular${this.localConfig.params}&page=${page}`);
  }

  getActorById(id?: number) {
    return this.http.get(`${this.localConfig.personUrl}/${id}${this.localConfig.params}`);
  }

  getFavoriteFilms(films) {
    this.getListOfFavotitesFilms(this.userId, this.sessionId).subscribe(
      (favoriteFilms: any) => {
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

  markFavorite(id, value, films) {
    this.addFilmToFavorite(
      this.userId,
      this.sessionId,
      'movie',
      id,
      value
    ).subscribe(res => {
      this.getFavoriteFilms(films);
      this.getListOfFavotitesFilms(this.userId, this.sessionId).subscribe(
        (favorites: any) => {
          return this.changefavoriteNumber(favorites.total_results);
        }
      );
    });
  }

  getFavorite(filmIds: Array<number>) {
    return this.http.get(
      `${this.localConfig.favoriteApiUrl}?filmIds=${filmIds.join(',')}`
    );
  }
}
