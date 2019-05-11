import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FilmService } from '../film.service';
import { Film } from '../film';

@Component({
  selector: '.films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {

  films: Film[];

  // aditionalTitle: string;
  // description: string = 'Parent component data';
  
  
  constructor(private filmsService: FilmService) {   
  }

  // setUpdatedValue(eventParam){
  //   this.filmsService
  //   this.aditionalTitle = eventParam;
  //   //console.log(event);
  // }
  
  ngOnInit() { 
    this.films = this.filmsService.getAll();
  }
  
}
