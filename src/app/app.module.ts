import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { MenuJugarComponent } from '../menu-jugar/menu-jugar.component';
import { JugableComponent } from '../jugable/jugable.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ConfiguracionComponent } from '../configuracion/configuracion.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppComponent,
    MenuJugarComponent,
    JugableComponent,
    HttpClientModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
