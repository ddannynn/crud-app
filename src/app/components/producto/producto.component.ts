import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from '../../entities/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  // producto!: Producto[];
  producto: Producto[] = [];
  displayedColumns: string[] = ['cod_producto', 'nombre', 'precio', 'acciones'];

  constructor(
    private service: ProductoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe((res: any) => {
      this.producto = res;
    });
  }

  delete(id: String) {
    console.log(id);
    this.service.delete(id).subscribe(
      (res) => {
        this.getAll();

        this.snackBar.open('Producto eliminado con éxito', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      },
      (err) => {
        this.snackBar.open('ERROR: No se pudo eliminar producto', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    );
  }
}
