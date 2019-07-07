import { Component, OnInit, Inject } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Film } from '../../models/film';

import { LOCAL_CONFIG } from '../../config/config-api';
import { ApiConfig } from '../../models/api';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public spiner: boolean = true;  
  public showDetails: boolean; 
  public id: number;
  public film: any;

  constructor(
    public filmsService: FilmService, 
    private router: Router,
    private route: ActivatedRoute,
    private filmService: FilmService,
    @Inject(LOCAL_CONFIG) public localConfig: ApiConfig
  ) { }

  ngOnInit() {
    this.spiner = false;     

    if (this.filmsService.currentRoute === undefined) {
      this.router.navigate(['/main']);
    }

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get("id");
      this.filmsService.getFilmById(this.id).subscribe(film => {
        this.film = film;
        console.log(this.film);
      });      
    });

    
    
    this.showDetails = this.filmsService.currentRoute === `/films/details/${this.id}` ? true : false;  
  }  

}
