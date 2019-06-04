import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  incrementCounter() {
    this.appService.increment();
  }

  decrementtCounter() {
    this.appService.decrement();
  }

}
