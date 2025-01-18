import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { MenuJugarComponent } from '../menu-jugar/menu-jugar.component';
import { JugableComponent } from '../jugable/jugable.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CabeceraComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'adivinaLaBandera';
}
