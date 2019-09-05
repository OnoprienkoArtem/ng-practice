import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() page: number; // the current page
  @Input() count: number; // how many total items there are in all pages
 
  @Input() loading: boolean; // check if content is being loaded

  @Input() perPage: number; // how many items we want to show per page


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

  onNext(next: boolean): void {
    this.goNext.emit(next);
  }




  getPages(): number[] {
    console.log(this.count);
    console.log(this.perPage);

    const c = Math.ceil(this.count / this.perPage);

    console.log(c);


    const p = this.page || 1;


    const pagesToShow = 9;


    const pages: number[] = [];
    
    pages.push(p);
    const times = pagesToShow - 1;
    for (let i = 0; i < times; i++) {
      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
        }
      }
      if (pages.length < pagesToShow) {
        if (Math.max.apply(null, pages) < c) {
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }
    }
    pages.sort((a, b) => a - b);
    console.log(pages);
    return pages;
  }

}
