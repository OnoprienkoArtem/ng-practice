import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmsListComponent } from './films-list/films-list.component';
import { MainComponent } from './main/main.component';
import { FilmItemComponent } from './films-list/film-item/film-item.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    FilmsListComponent, 
    MainComponent, 
    FilmItemComponent
    ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    FlexLayoutModule
  ]
})
export class FilmsCatalogModule { }
