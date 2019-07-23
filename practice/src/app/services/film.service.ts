import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCAL_CONFIG } from '../config/config-api';
import { ApiConfig } from '../models/api';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmService {


  constructor(private http: HttpClient, @Inject(LOCAL_CONFIG) public localConfig: ApiConfig) {}


  

  public currentPage: number;

  set currentPageActors(value: number) {
    this.currentPage = value;
  }

  get currentPageActors() {
    return this.currentPage || 1;
  }
  



  getToken() {
    return this.http.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=f7ce96b08789255f247db434150c7493`);
  }

  bindingTokenWithAccount(requst_token: string) {
    return this.http.get(`https://api.themoviedb.org/3/authentication/token/validate_with_login?username=artemo&password=cinemaart&request_token=${requst_token}&api_key=f7ce96b08789255f247db434150c7493`);
  }

  getSession(requst_token: string) {
    return this.http.get(`https://api.themoviedb.org/3/authentication/session/new?api_key=f7ce96b08789255f247db434150c7493&request_token=${requst_token}`);
  }

  getUserData(session_id: string) {
    return this.http.get(`https://api.themoviedb.org/3/account?api_key=f7ce96b08789255f247db434150c7493&session_id=${session_id}`);
  }

  addFilmToFavorite(user_id, session_id, type, id, favorite) {
    return this.http.post(`https://api.themoviedb.org/3/account/<<user_id>>/favorite?api_key=f7ce96b08789255f247db434150c7493&session_id=${session_id}`, {media_type: type, media_id: id, favorite: favorite});
  }









  getPopularFilms(page?: number) {
    return this.http.get(`${this.localConfig.movieUrl}/popular${this.localConfig.params}&page=${page}`)
  }

  getFilmById(id?: number) {
    return this.http.get(`${this.localConfig.movieUrl}/${id}${this.localConfig.params}`)
  }
  




  getPopularActors(page?: number) {
    return this.http.get(`${this.localConfig.personUrl}/popular${this.localConfig.params}&page=${page}`)
  }
  
  getActorById(id?: number) {
    return this.http.get(`${this.localConfig.personUrl}/${id}${this.localConfig.params}`)
  }





  getFavorite(filmIds: Array<number>) {
    return this.http.get(`${this.localConfig.favoriteApiUrl}?filmIds=${filmIds.join(',')}`);
  }

  addToFavorite(id: number) {
    return this.http.post(this.localConfig.favoriteApiUrl, {filmId: id});
  }

  removeFromFavorite(id: number) {
    return this.http.delete(`${this.localConfig.localApiUrl}/films/${id}/favorites`);
  }



  getBookmark(filmIds: Array<number>) {
    return this.http.get(`${this.localConfig.bookmarkApiUrl}?filmIds=${filmIds.join(',')}`);
  }

  addToBookmark(id: number) {
    return this.http.post(this.localConfig.bookmarkApiUrl, { filmId: id });
  }

  removeFromBookmark(id: number) {
    return this.http.delete(`${this.localConfig.localApiUrl}/films/${id}/bookmarks`);
  }



  public currentRouteValue: string;

  set currentRoute(value: any) {
    this.currentRouteValue = value;
  }

  get currentRoute() {
    return this.currentRouteValue;
  }



}
