import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WikipediaService } from '../app/wikipedia.service';
import { HttpClient } from '@angular/common/http';

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

  infoPais: string | null = null;
  paisSeleccionado: string | null = null;
  capital: string = '';
  poblacion: string = '';
  posicionGeografica: string = '';
  vecinos: string = '';
  temperatura: string = '';

  constructor(
    private router: Router,
    private wikipediaService: WikipediaService,
    private http: HttpClient
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
    this.wikipediaService.consiguePaisInfo(pais).subscribe((response) => {
      const pages = response.query.pages;
      const pageId = Object.keys(pages)[0];
      this.paisSeleccionado = pais;
      this.infoPais = pages[pageId].extract;
    });

    this.http.get(`https://restcountries.com/v3.1/name/${pais}`).subscribe(
      (data: any) => {
        const country = data[0];
        this.capital = country.capital[0];
        this.poblacion = country.population.toLocaleString();
        this.posicionGeografica = `Latitud: ${country.latlng[0]}, Longitud: ${country.latlng[1]}`;
        this.vecinos = country.borders ? country.borders.join(', ') : 'Ninguno';

        this.getClima(country.latlng[0], country.latlng[1]);
      },
      (error) => {
        console.error('Error al obtener datos del país:', error);
      }
    );
  }

  getClima(lat: number, lon: number) {
    const apiKey = 'fa6716367aa388c4b156d941829a8da4';
    this.http
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      )
      .subscribe(
        (data: any) => {
          this.temperatura = data.main.temp;
        },
        (error) => {
          console.error('Error al obtener clima:', error);
        }
      );
  }

  cierraInfo(): void {
    this.infoPais = null;
    this.paisSeleccionado = null;
    this.capital = '';
    this.poblacion = '';
    this.posicionGeografica = '';
    this.vecinos = '';
    this.temperatura = '';
  }
}
