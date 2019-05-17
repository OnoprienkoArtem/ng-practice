import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { FilmsListComponent } from './films-list/films-list.component';
import { FilmItemComponent } from '../shared/film-item/film-item.component';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { MaterialModule } from '../modules/material/material.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    MainComponent, 
    FilmsListComponent, 
    FilmItemComponent,
    DetailsComponent
  ]
})
export class FilmCatalogModule { }
