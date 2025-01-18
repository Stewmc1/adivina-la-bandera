import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resultados',
  imports: [RouterModule, CommonModule],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css',
})
export class ResultadosComponent {
  navigateToMenu() {
    this.router.navigate(['menu']);
  }

  respuestasCorrectas!: number;
  tiempoTranscurrido!: string;
  rondasTotales!: number;
  paisesCorrectos: string[] = [];
  paisesIncorrectos: string[] = [];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      respuestasCorrectas: number;
      tiempoTranscurrido: string;
      rondasTotales: number;
      paisesCorrectos: string[];
      paisesIncorrectos: string[];
    };

    if (state) {
      this.respuestasCorrectas = state.respuestasCorrectas;
      this.tiempoTranscurrido = state.tiempoTranscurrido;
      this.rondasTotales = state.rondasTotales;
      this.paisesCorrectos = state.paisesCorrectos;
      this.paisesIncorrectos = state.paisesIncorrectos;
    }
  }
}
