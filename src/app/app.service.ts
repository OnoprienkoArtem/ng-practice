import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  counter = 0;

  counterBus$ = new Subject();

  constructor() { }

  increment() {
    this.counter++;
    this.counterBus$.next(this.counter);
  }

  decrement() {
    this.counter--;
    this.counterBus$.next(this.counter);
  }

  getCounter() {
    return this.counterBus$.asObservable();
  }


}
