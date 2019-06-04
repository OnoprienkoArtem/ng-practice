import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
@Component({
  selector: 'app-subscriber1',
  templateUrl: './subscriber1.component.html',
  styleUrls: ['./subscriber1.component.scss']
})
export class Subscriber1Component implements OnInit {

  counter: number;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getCounter().subscribe( (c: number) => {
      this.counter = c;
    });
  }

}
