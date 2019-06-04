import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-subscriber2',
  templateUrl: './subscriber2.component.html',
  styleUrls: ['./subscriber2.component.scss']
})
export class Subscriber2Component implements OnInit {
  counter: number;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getCounter().subscribe((c: number) => {
      this.counter = c;
    });
  }

}
