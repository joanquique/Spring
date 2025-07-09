import { Routes } from '@angular/router';
import { UsuarioListComponent } from './components/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
  { path: 'usuarios', component: UsuarioListComponent },
  { path: 'usuarios/nuevo', component: UsuarioFormComponent },
  { path: 'usuarios/editar/:id', component: UsuarioFormComponent },
  { path: '**', redirectTo: 'usuarios' }
];
