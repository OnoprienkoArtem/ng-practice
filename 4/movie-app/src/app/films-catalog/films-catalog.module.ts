import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmsListComponent } from './films-list/films-list.component';
import { MainComponent } from './main/main.component';
import { FilmItemComponent } from './films-list/film-item/film-item.component';

import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    FilmsListComponent, 
    MainComponent, 
    FilmItemComponent
    ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class FilmsCatalogModule { }
