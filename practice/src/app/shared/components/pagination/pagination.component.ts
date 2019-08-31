import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() page: number; // the current page
  @Input() count: number; // how many total items there are in all pages
  @Input() perPage: number; // how many items we want to show per page
  @Input() pagesToShow: number; // how many pages between next/prev
  @Input() loading: boolean; // check if content is being loaded

  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

}
