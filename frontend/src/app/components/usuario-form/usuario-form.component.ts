import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Usuario, UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {
  form!: FormGroup;
  idUsuario?: number;
  esEdicion = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.minLength(6)]],
      rol: ['USER', Validators.required]
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.idUsuario = +params['id'];
        this.esEdicion = true;
        this.cargarUsuario(this.idUsuario);
        // En edición, contraseña no es obligatoria
        this.form.get('contrasena')?.clearValidators();
        this.form.get('contrasena')?.updateValueAndValidity();
      }
    });
  }

  cargarUsuario(id: number) {
    this.usuarioService.getUsuario(id).subscribe(usuario => {
      this.form.patchValue({
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
        // No seteamos contraseña por seguridad
      });
    });
  }

  // Lógica de alerta exitosa
  alertaVisible = false;
  mensajeAlerta = '';

  mostrarAlerta(mensaje: string) {
    this.mensajeAlerta = mensaje;
    this.alertaVisible = true;

    setTimeout(() => {
      this.alertaVisible = false;
    }, 3000); // desaparece después de 3 segundos
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const usuario: Usuario = {
      nombre: this.form.value.nombre,
      correo: this.form.value.correo,
      rol: this.form.value.rol,
      contrasena: this.form.value.contrasena
    };

    if (this.form.value.contrasena) {
      usuario.contrasena = this.form.value.contrasena;
    }

    if (this.esEdicion && this.idUsuario) {
      this.usuarioService.actualizarUsuario(this.idUsuario, usuario).subscribe(() => {
        //alert('Usuario actualizado');
        this.mostrarAlerta('Usuario actualizado correctamente');
        setTimeout(() => {
          this.router.navigate(['/usuarios']);
        }, 2000); 
      });
    } else {
      this.usuarioService.crearUsuario(usuario).subscribe(() => {
        //alert('Usuario creado');
        this.mostrarAlerta('Usuario creado correctamente');
        setTimeout(() => {
          this.router.navigate(['/usuarios']);
        }, 2000);
      });
    }
  }
}
