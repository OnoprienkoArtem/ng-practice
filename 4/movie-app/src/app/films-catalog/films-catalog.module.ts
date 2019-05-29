import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FilmsListComponent } from './films-list/films-list.component';
import { MainComponent } from './main/main.component';
import { FilmItemComponent } from './films-list/film-item/film-item.component';
import { ActorItemComponent } from '../shared/components/actor-item/actor-item.component';
import { FavoriteCountComponent } from '../shared/components/favorite-count/favorite-count.component';
import { SortingComponent } from '../shared/components/sorting/sorting.component';
import { SearchComponent } from '../shared/components/search/search.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    FilmsListComponent, 
    MainComponent, 
    FilmItemComponent,
    FavoriteCountComponent,
    SortingComponent,
    ActorItemComponent,
    SearchComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule
  ]
})
export class FilmsCatalogModule { }
