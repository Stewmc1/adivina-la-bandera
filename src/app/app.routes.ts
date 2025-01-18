import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JugableComponent } from '../jugable/jugable.component';
import { MenuJugarComponent } from '../menu-jugar/menu-jugar.component';
import { ConfiguracionComponent } from '../configuracion/configuracion.component';
import { JugarCapitalesComponent } from './jugar-capitales/jugar-capitales.component';
import { JugarContinenteComponent } from './jugar-continente/jugar-continente.component';
import { ResultadosComponent } from '../resultados/resultados.component';

export const routes: Routes = [
  { path: '', component: MenuJugarComponent },
  { path: 'menu', component: MenuJugarComponent },
  { path: 'jugable', component: JugableComponent },
  { path: 'configuracion', component: ConfiguracionComponent },
  { path: 'capitales', component: JugarCapitalesComponent },
  { path: 'continente', component: JugarContinenteComponent },
  { path: 'resultados', component: ResultadosComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
