import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/entities/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { SucursalService } from '../../services/sucursal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sucursal } from 'src/app/entities/sucursal';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css'],
})
export class UsuarioFormComponent implements OnInit {
  sucursal!: Sucursal[];
  form: FormGroup;
  // usuario: Usuario = new Usuario();
  usuario: Usuario = {
    cod_usuario: '',
    nombre: '',
    user: '',
    password: '',
    sucursal: {
      cod_sucursal: '',
      nombre: '',
    },
  };
  btnUpdate: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private sucursalService: SucursalService,
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      cod_usuario: ['', Validators.required],
      nombre: ['', Validators.required],
      user: ['', Validators.required],
      password: ['', Validators.required],
      cod_sucursal: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadSucursal();
    this.load();
  }

  loadSucursal() {
    this.sucursalService.getAll().subscribe((res: any) => {
      this.sucursal = res;
    });
  }

  save() {
    this.usuario = {
      cod_usuario: this.form.value.cod_usuario,
      nombre: this.form.value.nombre,
      user: this.form.value.user,
      password: this.form.value.password,
      sucursal: {
        cod_sucursal: this.form.value.cod_sucursal,
        nombre: this.form.value.cod_sucursal,
      },
    };

    console.log(this.usuario);

    this.usuarioService.save(this.usuario).subscribe(
      (res) => {
        this.router.navigate(['/usuario']);

        this.snackBar.open('Usuario agregado con éxito', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      },
      (err) => {
        this.snackBar.open('ERROR: No se pudo agregar usuario', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    );
  }

  load() {
    this.activatedRoute.params.subscribe((u) => {
      let id = u['id'];
      if (id) {
        this.btnUpdate = true;
        this.usuarioService.getById(id).subscribe((res) => {
          console.log(res);
          this.usuario = res;
        });
      }
    });
  }

  update() {
    this.usuario = {
      cod_usuario: this.form.value.cod_usuario,
      nombre: this.form.value.nombre,
      user: this.form.value.user,
      password: this.form.value.password,
      sucursal: {
        cod_sucursal: this.form.value.cod_sucursal,
        nombre: '',
      },
    };

    this.usuarioService.update(this.usuario).subscribe(
      (res) => {
        this.router.navigate(['/usuario']);

        this.snackBar.open('Usuario actualizado con éxito', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      },
      (err) => {
        this.snackBar.open('ERROR: No se pudo actualizar usuario', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    );
  }
}
