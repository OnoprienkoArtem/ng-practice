import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { FilmsCatalogModule } from './films-catalog/films-catalog.module';
import { AuthModule } from './auth/auth.module';
import { MaterialModule } from './material/material.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';

import { LOCAL_CONFIG, localConfig } from './config/config-api';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FilmsCatalogModule,
    MaterialModule,
    SharedModule,
    AuthModule
  ],
  providers: [
    { provide: LOCAL_CONFIG, useValue: localConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
