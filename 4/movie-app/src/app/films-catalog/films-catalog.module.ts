import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FilmsListComponent } from './films-list/films-list.component';
import { MainComponent } from './main/main.component';
import { FilmItemComponent } from '../shared/components/film-item/film-item.component';
import { ActorItemComponent } from '../shared/components/actor-item/actor-item.component';
import { FavoriteCountComponent } from '../shared/components/favorite-count/favorite-count.component';
import { SortingComponent } from '../shared/components/sorting/sorting.component';
import { SearchComponent } from '../shared/components/search/search.component';
import { SpinerComponent } from '../shared/components/spiner/spiner.component';

import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    FilmsListComponent, 
    MainComponent, 
    FilmItemComponent,
    FavoriteCountComponent,
    SortingComponent,
    ActorItemComponent,
    SearchComponent,
    SpinerComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ]
})
export class FilmsCatalogModule { }
