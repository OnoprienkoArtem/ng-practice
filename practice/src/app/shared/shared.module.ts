import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';

import { FilmItemComponent } from './components/film-item/film-item.component';
import { ActorItemComponent } from '../shared/components/actor-item/actor-item.component';
import { SearchComponent } from '../shared/components/search/search.component';
import { SpinerComponent } from '../shared/components/spiner/spiner.component';

@NgModule({
  declarations: [
    FilmItemComponent,
    ActorItemComponent,
    SearchComponent,
    SpinerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    FilmItemComponent,
    ActorItemComponent,
    SearchComponent,
    SpinerComponent
  ]
})
export class SharedModule { }
