import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCAL_CONFIG } from '../config/config-api';
import { ApiConfig } from '../models/api';
import { Subject, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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


  public setFavoriteFilmsList(value: any) {
    this.favoriteList$.next(value);
  }

  public getFavoriteFilmsList(): Observable<any> {
    return this.favoriteList$.asObservable();
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


  // Get number of all favorite list and check mark items
  getFavoriteFilms(films, userId, sessionId) {
    //  Get number of all favorites list
    this.getListOfFavotitesFilms(userId, sessionId, this.currentPageFavorites).subscribe((favorites: any) => {     
      let favoriteList = [];
      // Get each page favorites
      for (let i = 1; i <= favorites.total_pages; i++) {
        this.getListOfFavotitesFilms(userId, sessionId, i).subscribe((favorites: any) => {

          favorites.results.map(item => favoriteList.push(item.id));
          films.map(item => item.isFavorite = favoriteList.indexOf(item.id) > -1);
        })
      }
      this.setFavoriteFilmsList(favorites.results);
      this.changefavoriteNumber(favorites.total_results);
    });    
  }  

  // Mark film items as favorite
  markFavorite(id, value, films, userId, sessionId) {
    this.addFilmToFavorite(userId, sessionId, 'movie', id, value).subscribe(res => { 
      this.getFavoriteFilms(films, userId, sessionId); 
    });
  }


}
