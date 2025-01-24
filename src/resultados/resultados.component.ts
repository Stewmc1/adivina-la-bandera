import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WikipediaService } from '../app/wikipedia.service';

@Component({
  selector: 'app-resultados',
  imports: [RouterModule, CommonModule],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css',
})
export class ResultadosComponent {
  respuestasCorrectas!: number;
  tiempoTranscurrido!: string;
  rondasTotales!: number;
  paisesCorrectos: string[] = [];
  paisesIncorrectos: string[] = [];
  infoPais: string | null = null;
  paisSeleccionado: string | null = null;

  constructor(
    private router: Router,
    private wikipediaService: WikipediaService
  ) {
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

  consigueInfoPais(pais: string): void {
    this.wikipediaService.consiguePaisInfo(pais).subscribe(
      (response) => {
        const pages = response.query.pages;
        const pageId = Object.keys(pages)[0];

        if (pages[pageId].extract) {
          this.paisSeleccionado = pais;
          this.infoPais = pages[pageId].extract;
        } else {
          this.paisSeleccionado = pais;
          this.infoPais =
            'No ha sido posible encontrar información sobre este país en este momento :(';
        }
      },
      (error) => {
        this.paisSeleccionado = pais;
        this.infoPais =
          'No ha sido posible encontrar información sobre este país en este momento :(';
      }
    );
  }

  cierraInfo(): void {
    this.infoPais = null;
    this.paisSeleccionado = null;
  }
}
