import { Component, OnInit } from '@angular/core';
import { Usuario, UsuarioService } from '../../services/usuario.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [ CommonModule, RouterModule, HttpClientModule ],
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe(data => this.usuarios = data);
  }

  eliminarUsuario(id?: number) {
    if(!id) return;
    this.usuarioService.eliminarUsuario(id).subscribe(() => this.cargarUsuarios());
  }

  editarUsuario(usuario: Usuario) {
    // Aquí abres el formulario con los datos para editar (más adelante)
  }
}
