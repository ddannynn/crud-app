import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/entities/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css'],
})
export class ProductoFormComponent implements OnInit {
  form: FormGroup;
  producto: Producto = new Producto();
  btnUpdate: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: ProductoService,
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      cod_producto: ['', Validators.required],
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.load();
  }

  save() {
    this.producto = {
      cod_producto: this.form.value.cod_producto,
      nombre: this.form.value.nombre,
      precio: this.form.value.precio,
    };

    this.service.save(this.producto).subscribe(
      (res) => {
        this.router.navigate(['/producto']);

        this.snackBar.open('Producto agregado con éxito', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      },
      (err) => {
        this.snackBar.open('ERROR: No se pudo agregar producto', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    );
  }

  load() {
    this.activatedRoute.params.subscribe((p) => {
      let id = p['id'];
      if (id) {
        this.btnUpdate = true;
        this.service.getById(id).subscribe((res) => {
          this.producto = res;
        });
      }
    });
  }

  update() {
    this.producto = {
      cod_producto: this.form.value.cod_producto,
      nombre: this.form.value.nombre,
      precio: this.form.value.precio,
    };

    this.service.update(this.producto).subscribe(
      (res) => {
        this.router.navigate(['/producto']);

        this.snackBar.open('Producto actualizado con éxito', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      },
      (err) => {
        this.snackBar.open('ERROR: No se pudo actualizar producto', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    );
  }
}
