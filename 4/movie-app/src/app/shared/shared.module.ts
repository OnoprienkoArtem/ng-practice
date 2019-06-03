import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmItemComponent } from './components/film-item/film-item.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    FilmItemComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    FilmItemComponent
  ]
})
export class SharedModule { }
