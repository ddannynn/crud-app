import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/entities/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  // usuario!: Usuario[];
  usuario: Usuario[] = [];
  displayedColumns: string[] = [
    'cod_usuario',
    'nombre',
    'user',
    'sucursal',
    'acciones',
  ];

  constructor(private service: UsuarioService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe((res: any) => {
      this.usuario = res;
    });
  }

  delete(id: String) {
    console.log(id);
    this.service.delete(id).subscribe(
      (res) => {
        this.getAll();

        this.snackBar.open('Usuario eliminado con éxito', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      },
      (err) => {
        this.snackBar.open('ERROR: No se pudo eliminar usuario', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    );
  }
}
