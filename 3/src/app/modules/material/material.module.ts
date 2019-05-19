import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], 
  exports: [
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatInputModule
  ]
})
export class MaterialModule { }
