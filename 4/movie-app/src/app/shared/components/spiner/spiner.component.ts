import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-spiner',
  templateUrl: './spiner.component.html',
  styleUrls: ['./spiner.component.scss']
})
export class SpinerComponent implements OnInit {

  @Input('spiner') spiner: any;
  @Output() showSpiner = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    this.showSpiner.emit();
  }

}
