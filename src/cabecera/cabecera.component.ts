import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  imports: [RouterModule],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css',
})
export class CabeceraComponent {
  router: any;
  navigateToMenu() {
    this.router.navigate(['menu']);
  }
}
