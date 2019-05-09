import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FilmService } from '../film.service';

@Component({
  selector: '.films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
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
