import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() page: number; // the current page
  @Input() totalPages: number; // how many total items there are in all pages
  
  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goPage = new EventEmitter<number>();
  

  constructor() { }

  ngOnInit() {}



  onPage(n: number): void {
    this.goPage.emit(n);
  }

  onPrev(): void {
    this.goPrev.emit(true);
  }

  onNext(): void {
    this.goNext.emit(true);
  }

  getPages(): number[] {
    const page = this.page || 1;
    const pagesToShow = 9;
    const pages: number[] = [];

    pages.push(page);    

    for (let i = 0; i < pagesToShow - 1; i++) {
      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
        }
        if (Math.max.apply(null, pages) < this.totalPages) {
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }   
    }

    pages.sort((a, b) => a - b);   
    return pages;
  }

}
