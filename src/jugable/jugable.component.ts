import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as countriesData from '../assets/countries.json';
import { CommonModule } from '@angular/common';
import { ConfiguracionService } from '../configuracion/configuracion.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

export interface PaisDto {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  name: {
    common: string;
    official: string;
    nativeName: {
      ara?: {
        official: string;
        common: string;
      };
    };
  };
  capital: string[];
  region: string;
  estado?: string;
}

@Component({
  selector: 'app-jugable',
  imports: [CommonModule],
  templateUrl: './jugable.component.html',
  styleUrl: './jugable.component.css',
})
export class JugableComponent implements OnInit {
  data: PaisDto[] = (countriesData as any).default; // Todos los países
  opciones: PaisDto[] = []; // Opciones
  opcionCorrecta!: PaisDto; // Bandera que se muestra
  respuestasCorrectas = 0; // Número de respuestas correctas
  seleccionoRespuesta = false; // Indica si ya eligió una respuesta
  juegoTerminado = false; // Indica si ya se jugaron todas las banderas
  totalJugadas = 0; // Contador de cuántas rondas se jugaron
  totalBanderas = this.data.length; // Total de banderas
  paisesJugados: Set<string> = new Set(); // Para evitar que una bandera se repita como bandera
  mensajeFinal = ''; // Mensaje final cuando se termina el juego
  rondasTotales: number = 0; // Total de rondas a jugar
  banderas: any[] = []; //Lista de banderas
  banderaActual: any = null;
  paisesCorrectos: string[] = []; // Lista de países correctos
  paisesIncorrectos: string[] = []; // Lista de países incorrectos

  tiempoInicio!: number; // Marca de tiempo al inicio de la ronda
  tiempoTranscurrido: string = '00:00'; // Tiempo transcurrido en formato mm:ss
  temporizador: any; // Referencia al intervalo del temporizador

  correctoAudio = new Audio('/assets/correcto.mp3'); //Archivo del audio de correcto
  incorrectoAudio = new Audio('/assets/incorrecto.mp3'); //Archivo del audio de incorrecto
  sonidosActivados = true; //Para habilitar o deshabilitar el audio dependiendo de lo que quiera el usuario

  constructor(
    private configuracionService: ConfiguracionService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.rondasTotales = this.configuracionService.getRondasSeleccionadas(); // Obtén el valor del servicio
    this.iniciarTemporizador();
    this.seleccionarOpciones();
  }

  // Inicia el temporizador al inicio del juego o de cada ronda
  iniciarTemporizador() {
    clearInterval(this.temporizador); // Detenemos cualquier temporizador previo
    this.tiempoInicio = Date.now();
    this.temporizador = setInterval(() => {
      const ahora = Date.now();
      const tiempoEnSegundos = Math.floor((ahora - this.tiempoInicio) / 1000);
      this.tiempoTranscurrido = this.formatearTiempo(tiempoEnSegundos);

      // Notificamos a Angular que hay un cambio
      this.cd.detectChanges();
    }, 1000);
  }

  // Formatea el tiempo en mm:ss
  formatearTiempo(segundos: number): string {
    const minutos = Math.floor(segundos / 60);
    const restoSegundos = segundos % 60;
    return `${this.agregarCero(minutos)}:${this.agregarCero(restoSegundos)}`;
  }

  // Agrega un cero inicial si es necesario
  agregarCero(valor: number): string {
    return valor < 10 ? `0${valor}` : `${valor}`;
  }

  // Si ya se jugaron todas las banderas
  seleccionarOpciones() {
    if (this.totalJugadas === this.rondasTotales) {
      this.juegoTerminado = true;
      this.mensajeFinal = `Juego Terminado! Respuestas correctas: ${this.respuestasCorrectas} de ${this.rondasTotales}`;
      clearInterval(this.temporizador);
      return;
    }
    // Reinicia el estado en cada ronda
    this.opciones.forEach((opcion) => delete opcion['estado']);
    this.seleccionoRespuesta = false;

    // Filtra los países que ya se han jugado como bandera
    const noJugados = this.data.filter(
      (pais) => !this.paisesJugados.has(pais.name.common)
    );
    const shuffled = [...noJugados].sort(() => Math.random() - 0.5); // Barajamos los países no jugados

    // Si hay menos de 4 países no jugados, agregamos países ya jugados, pero no la bandera correcta
    let opcionesRestantes = shuffled.slice(0, 4);

    if (opcionesRestantes.length < 4) {
      // Completamos las opciones con países repetidos, pero sin incluir la bandera correcta
      const paisesYaJugados = this.data.filter(
        (pais) =>
          this.paisesJugados.has(pais.name.common) &&
          pais.name.common !== this.opcionCorrecta?.name.common
      );

      while (opcionesRestantes.length < 4) {
        const randomPais =
          paisesYaJugados[Math.floor(Math.random() * paisesYaJugados.length)];
        if (!opcionesRestantes.includes(randomPais)) {
          opcionesRestantes.push(randomPais);
        }
      }
    }

    // Seleccionamos una opción correcta aleatoria entre las opciones
    this.opcionCorrecta =
      opcionesRestantes[Math.floor(Math.random() * opcionesRestantes.length)];

    // Marcar la bandera seleccionada como jugada
    this.paisesJugados.add(this.opcionCorrecta.name.common);

    // Actualiza el contador de rondas jugadas
    this.totalJugadas += 1;

    // Asegurarse de que las opciones son únicas
    this.opciones = this.eliminarDuplicados(opcionesRestantes);
  }

  // Elimina duplicados en las opciones
  eliminarDuplicados(opciones: PaisDto[]): PaisDto[] {
    return [...new Set(opciones.map((pais) => pais.name.common))].map(
      (name) => opciones.find((pais) => pais.name.common === name)!
    );
  }

  // Maneja la respuesta del jugador
  manejarRespuesta(opcion: PaisDto) {
    if (this.seleccionoRespuesta) return;
    this.seleccionoRespuesta = true;

    if (opcion.name.common === this.opcionCorrecta.name.common) {
      this.respuestasCorrectas++;
      opcion['estado'] = 'correcto';
      this.paisesCorrectos.push(this.opcionCorrecta.name.common); // Agregar a correctos
      if (this.sonidosActivados) {
        this.correctoAudio.play();
      }
    } else {
      opcion['estado'] = 'incorrecto';
      this.paisesIncorrectos.push(this.opcionCorrecta.name.common); // Agregar a incorrectos
      this.opcionCorrecta['estado'] = 'correcto';
      if (this.sonidosActivados) {
        this.incorrectoAudio.play();
      }
    }
  }

  // Continuar con la siguiente ronda
  continuar() {
    // Si el juego terminó, no hacer nada
    if (this.juegoTerminado) return;

    // Verificar si es la última ronda
    if (this.totalJugadas === this.rondasTotales) {
      this.juegoTerminado = true;
      this.router.navigate(['/resultados'], {
        state: {
          respuestasCorrectas: this.respuestasCorrectas,
          tiempoTranscurrido: this.tiempoTranscurrido,
          rondasTotales: this.rondasTotales,
          paisesCorrectos: this.paisesCorrectos,
          paisesIncorrectos: this.paisesIncorrectos,
        },
      });
    }

    // Reinicia el estado de las opciones
    this.opciones.forEach((opcion) => delete opcion.estado);
    this.seleccionarOpciones();
  }

  cambiarSonidos() {
    this.sonidosActivados = !this.sonidosActivados;
  }
}
