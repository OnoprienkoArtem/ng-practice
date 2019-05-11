import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FilmService } from '../film.service';

@Component({
  selector: '.films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {
  aditionalTitle: string;
  description: string = 'Parent component data';
  
  
  constructor(public filmsService: FilmService) {   
  }

  setUpdatedValue(eventParam){
    this.filmsService
    this.aditionalTitle = eventParam;
    //console.log(event);
  }
  
  ngOnInit() { 
    
  }
  
}
