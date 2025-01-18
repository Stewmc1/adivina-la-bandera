import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ConfiguracionService } from './configuracion.service';
import { ModoJuegoService } from '../modoDeJuego.service';

@Component({
  selector: 'app-configuracion',
  imports: [RouterModule],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css',
})
export class ConfiguracionComponent {
  constructor(
    private router: Router,
    private configuracionService: ConfiguracionService,
    private modoJuegoService: ModoJuegoService
  ) {}

  navigateToJugable() {
    this.router.navigate(['jugable']);
  }

  navigateToCapitales() {
    this.router.navigate(['capitales']);
  }

  navigateToContinente() {
    this.router.navigate(['continente']);
  }

  correctoAudio = new Audio('/assets/correcto.mp3'); //Archivo del audio de correcto
  incorrectoAudio = new Audio('/assets/incorrecto.mp3'); //Archivo del audio de incorrecto
  sonidosActivados = true; //Para habilitar o deshabilitar el audio dependiendo de lo que quiera el usuario

  cambiarSonidos() {
    this.sonidosActivados = !this.sonidosActivados;
  }

  ngAfterViewInit() {
    const rangoInput = document.getElementById(
      'rangoCustom'
    ) as HTMLInputElement | null;
    const rangoValor = document.getElementById(
      'rangoValor'
    ) as HTMLSpanElement | null;

    if (rangoInput && rangoValor) {
      const allowedValues = [25, 50, 75, 100, 125, 150, 175, 200, 225, 250];

      // Configurar el valor inicial del rango
      const defaultValue = this.configuracionService.getRondasSeleccionadas();
      rangoInput.value = defaultValue.toString();
      rangoValor.textContent = defaultValue.toString();

      rangoInput.addEventListener('input', () => {
        const currentValue = parseInt(rangoInput.value, 10);

        // Encuentra el valor más cercano
        const closestValue = allowedValues.reduce((prev, curr) =>
          Math.abs(curr - currentValue) < Math.abs(prev - currentValue)
            ? curr
            : prev
        );

        rangoInput.value = closestValue.toString();
        rangoValor.textContent = closestValue.toString();
        this.configuracionService.setRondasSeleccionadas(closestValue);
      });
    }
  }
}
