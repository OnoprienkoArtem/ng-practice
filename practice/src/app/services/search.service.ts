import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCAL_CONFIG } from '../config/config-api';
import { ApiConfig } from '../models/api';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchValue: string;



  constructor(private http: HttpClient, @Inject(LOCAL_CONFIG) public localConfig: ApiConfig) {
    
  }


  getItemsBySearch(value: string, page: number) {
    return this.http.get(`${this.localConfig.searchUrl}/multi?query=${value}${this.localConfig.params}&page=${page}`)
  }

  getSearchFilms(searchFor: string, value: string, page: number) {
    return this.http.get(`${this.localConfig.searchUrl}/${searchFor}?query=${value}${this.localConfig.params}&page=${page}`)
  }


  
  
  set search(value: any) {
    this.searchValue = value;
  }

  get search() {
    return this.searchValue || false;
  }
}