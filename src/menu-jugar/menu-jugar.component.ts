import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-jugar',
  imports: [RouterModule],
  templateUrl: './menu-jugar.component.html',
  styleUrls: ['./menu-jugar.component.css'],
})
export class MenuJugarComponent {
  constructor(private router: Router) {}

  navigateToJugable() {
    this.router.navigate(['jugable']);
  }

  navigateToConfiguracion() {
    this.router.navigate(['configuracion']);
  }
}
