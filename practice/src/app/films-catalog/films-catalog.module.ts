import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';

import { FilmsListComponent } from './films-list/films-list.component';
import { MainComponent } from './main/main.component';
import { ActorsListComponent } from './actors-list/actors-list.component';
import { SearchResultComponent } from './search-result/search-result.component';

import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    FilmsListComponent, 
    MainComponent, ActorsListComponent, SearchResultComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
    SharedModule
  ]
})
export class FilmsCatalogModule { }
