import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Film } from '../../../models/film';
import { LOCAL_CONFIG } from '../../../config/config-api';
import { ApiConfig } from '../../../models/api';
import { FilmService } from '../../../services/film.service';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.scss']
})
export class FilmItemComponent implements OnInit {

  public imgUrl: string = this.localConfig.midImgPath;
  public currentRoute: string;

  @Input('data') film: Film;
  @Input('favorites') favorites;
  @Output() updateListOfFavorite = new EventEmitter<number>();
  @Output() updateListOfBooked = new EventEmitter<number>();

  constructor(
    @Inject(LOCAL_CONFIG) public localConfig: ApiConfig,
    public filmsService: FilmService,
    private router: Router
  ) { }

  ngOnInit() {






  }

  addToFavorites() {
    this.updateListOfFavorite.emit(this.film.id);
  }

  addToBooked() {
    this.updateListOfBooked.emit(this.film.id);
  }

  getDetails() {
    this.router.navigate(['/films/details', this.film.id]);
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) this.filmsService.currentRoute = event.url;
    });
  }

}
