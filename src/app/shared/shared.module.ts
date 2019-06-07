import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { FilmItemComponent } from './components/film-item/film-item.component';
import { ActorItemComponent } from '../shared/components/actor-item/actor-item.component';
import { FavoriteCountComponent } from '../shared/components/favorite-count/favorite-count.component';
import { SortingComponent } from '../shared/components/sorting/sorting.component';
import { SearchComponent } from '../shared/components/search/search.component';
import { SpinerComponent } from '../shared/components/spiner/spiner.component';

@NgModule({
  declarations: [
    FilmItemComponent,
    ActorItemComponent,
    FavoriteCountComponent,
    SortingComponent,
    SearchComponent,
    SpinerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    FilmItemComponent,
    ActorItemComponent,
    FavoriteCountComponent,
    SortingComponent,
    SearchComponent,
    SpinerComponent
  ]
})
export class SharedModule { }
