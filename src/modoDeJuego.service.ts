import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModoJuegoService {
  private modoJuegoSubject = new BehaviorSubject<'paises' | 'capitales'>(
    'paises'
  );
  modoJuego$ = this.modoJuegoSubject.asObservable();

  setModoJuego(modo: 'paises' | 'capitales'): void {
    this.modoJuegoSubject.next(modo);
  }

  getModoJuego(): 'paises' | 'capitales' {
    return this.modoJuegoSubject.value;
  }
}
