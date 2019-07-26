import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private state$ = new Subject<boolean>()

  constructor() { }

  public messageAction(value) {   
    this.state$.next(value);
  }

  public getState(): Observable<boolean> {
    return this.state$.asObservable();
  }

}
