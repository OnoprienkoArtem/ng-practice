import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmsListComponent } from './films-list/films-list.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [FilmsListComponent, MainComponent],
  imports: [
    CommonModule
  ]
})
export class FilmsCatalogModule { }
