import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Sucursal } from '../../entities/sucursal';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css'],
})
export class SucursalComponent implements OnInit {
  // sucursal!: Sucursal[];
  sucursal: Sucursal[] = [];
  displayedColumns: string[] = ['cod_sucursal', 'nombre', 'acciones'];

  constructor(
    private service: SucursalService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe((res: any) => {
      this.sucursal = res;
    });
  }

  delete(id: String) {
    console.log(id);
    this.service.delete(id).subscribe(
      (res) => {
        this.getAll();

        this.snackBar.open('Sucursal eliminada con éxito', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      },
      (err) => {
        this.snackBar.open('ERROR: No se pudo eliminar sucursal', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    );
  }
}
