import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FilmService } from '../film.service';

@Component({
  selector: '.films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css'],
  providers: [FilmService]
})
export class FilmsComponent implements OnInit {

  description: string = 'Middle card description';  
  items: object[] = [];

  constructor(public filmsService: FilmService) {}
  
  ngOnInit() { 
    this.items = this.filmsService.getData();
  }  
}
