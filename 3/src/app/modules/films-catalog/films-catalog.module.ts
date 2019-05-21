import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { FilmsListComponent } from './films-list/films-list.component';
import { FilmItemComponent } from '../../shared/components/film-item/film-item.component';
import { SearchComponent } from '../../shared/components/search/search.component';

@NgModule({
  declarations: [
    FilmsListComponent,
    FilmItemComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ]
})
export class FilmsCatalogModule { }
