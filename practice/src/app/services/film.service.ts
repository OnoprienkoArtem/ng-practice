import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCAL_CONFIG } from '../config/config-api';
import { ApiConfig } from '../models/api';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private http: HttpClient, @Inject(LOCAL_CONFIG) public localConfig: ApiConfig) {}


  getPopularFilms(page?: number) {
    return this.http.get(`${this.localConfig.movieUrl}/popular?page=${page}${this.localConfig.params}`)
  }

  getPopularActors(page?: number) {
    return this.http.get(`${this.localConfig.personUrl}/popular?page=${page}${this.localConfig.params}`)
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



}
