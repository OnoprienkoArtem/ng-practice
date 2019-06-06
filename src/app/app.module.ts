import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublisherComponent } from './publisher/publisher.component';
import { Subscriber1Component } from './subscriber1/subscriber1.component';
import { Subscriber2Component } from './subscriber2/subscriber2.component';

@NgModule({
  declarations: [
    AppComponent,
    PublisherComponent,
    Subscriber1Component,
    Subscriber2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
