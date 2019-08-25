import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCAL_CONFIG } from '../config/config-api';
import { ApiConfig } from '../models/api';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  public currentPage: number;
  // public knownForValue$ = new Subject<any>();
  public knownForValue = new Subject<any>();

  constructor(
    private http: HttpClient,
    @Inject(LOCAL_CONFIG) public localConfig: ApiConfig
  ) { }

  set currentPageActors(value: number) {
    this.currentPage = value;
  }

  get currentPageActors() {
    return this.currentPage || 1;
  }


  // set and get know_for value

  // public setKnownFor(value) {
  //   this.knownForValue$.next(value);
  // }

  // public getKnownFor(): Observable<boolean> {
  //   return this.knownForValue$.asObservable();
  // }

  set knownFor(value: any) {
    this.knownForValue = value;
  }

  get knownFor() {
    return this.knownForValue;
  }





  getPopularActors(page?: number) {
    return this.http.get(`${this.localConfig.personUrl}/popular${this.localConfig.params}&page=${page}`);
  }

  getActorById(id?: number) {
    return this.http.get(`${this.localConfig.personUrl}/${id}${this.localConfig.params}`);
  }
}
