

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AddComponent } from './movies/add/add.component';
import { ListComponent } from './movies/list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RoutingModule } from './routing.module';


@NgModule({
  declarations: [
    AddComponent,
    ListComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RoutingModule


  ],
  providers: [RoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
