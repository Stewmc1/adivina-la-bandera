import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionService {
  private rondasSeleccionadas: number = 250;

  setRondasSeleccionadas(valor: number): void {
    this.rondasSeleccionadas = valor;
  }

  getRondasSeleccionadas(): number {
    return this.rondasSeleccionadas;
  }
}
