import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public spiner: boolean = true;  
  public showDetails: boolean; 

  constructor(public filmsService: FilmService, private router: Router) { }

  ngOnInit() {
    this.spiner = false;     

    if (this.filmsService.currentRoute === undefined) {
      this.router.navigate(['/main']);
    }
    
    this.showDetails = this.filmsService.currentRoute === '/films/details' ? true : false;  
  }


  

}
