import { Component, OnInit, Inject } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { FilmService } from '../../services/film.service';
import { LOCAL_CONFIG } from '../../config/config-api';
import { ApiConfig } from '../../models/api';
import { Router } from '@angular/router';
import { Favorite } from '../../models/favorites';
import { Bookmark } from '../../models/bookmark';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  public spiner: boolean = true;
  public searchItems: any[] = [];
  public imgUrl: string = this.localConfig.midImgPath;
  public totalResalt: number;
  public isDisabledActorsBtn: boolean = false;
  public searchFor: string;

  constructor(
    @Inject(LOCAL_CONFIG) public localConfig: ApiConfig,
    private router: Router,
    public searchService: SearchService,
    public filmsService: FilmService
  ) { }

  pageCount: number = 1;
  totalPages: number;

  ngOnInit() {
    if (!this.searchService.search.searchValue) this.router.navigate(['/main']);

    switch (this.searchService.search.currentRoute) {
      case '/films':
        this.typeOfSearch('movie');
        break;
      case '/actors':
        this.typeOfSearch('person');
        break;
      default:
        this.typeOfSearch('multi');
        break;
    }
  }

  typeOfSearch(type) {
    this.searchFor = type;
    this.getSearchedList(
      this.searchFor,
      this.searchService.search.searchValue,
      this.pageCount
    );
  }

  getSearchedList(searchFor, searchValue, page) {
    this.searchService.getSearchFilms(searchFor, searchValue, page).subscribe(
      (res: any) => {
        this.searchItems = res.results;
        this.totalResalt = res.total_results;
        this.totalPages = res.total_pages;

        this.filmsService.getFavoriteFilms(this.searchItems);

        if (this.pageCount === this.totalPages) this.isDisabledActorsBtn = true;
        if (this.searchItems) {
          this.spiner = false;
        }
      },
      err => console.log('error', err)
    );
  }

  nextPage() {
    this.pageCount++;
    if (this.pageCount === this.totalPages) this.isDisabledActorsBtn = true;
    this.getSearchedList(
      this.searchFor,
      this.searchService.search.searchValue,
      this.pageCount
    );
  }

  private getFavorite() {
    this.filmsService
      .getFavorite(this.searchItems.map(item => item.id))
      .subscribe((favorites: Array<Favorite>) => {
        const favoriteList = favorites.map(favorite => favorite._id);
        this.searchItems.map(item => {
          item.isFavorite = favoriteList.indexOf(item.id) > -1;
        });
      });
  }

  // public addFilmToFavorit(id: number) {
  //   const favoriteFilms = this.searchItems.find(item => {
  //     return item.id === id;
  //   });

  //   if (favoriteFilms.isFavorite) {
  //     this.filmsService.removeFromFavorite(id).subscribe(() => this.getFavorite());
  //   } else {
  //     this.filmsService.addToFavorite(id).subscribe(() => this.getFavorite());
  //   }
  // }
}
