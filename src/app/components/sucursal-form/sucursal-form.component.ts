import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Sucursal } from '../../entities/sucursal';
import { SucursalService } from '../../services/sucursal.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sucursal-form',
  templateUrl: './sucursal-form.component.html',
  styleUrls: ['./sucursal-form.component.css'],
})
export class SucursalFormComponent implements OnInit {
  form: FormGroup;
  sucursal: Sucursal = new Sucursal();
  btnUpdate: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: SucursalService,
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      cod_sucursal: ['', Validators.required],
      nombre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.load();
  }

  save() {
    this.sucursal = {
      cod_sucursal: this.form.value.cod_sucursal,
      nombre: this.form.value.nombre,
    };

    this.service.save(this.sucursal).subscribe(
      (res) => {
        this.router.navigate(['/sucursal']);

        this.snackBar.open('Sucursal agregada con éxito', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      },
      (err) => {
        this.snackBar.open('ERROR: No se pudo agregar sucursal', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    );
  }

  load() {
    this.activatedRoute.params.subscribe((s) => {
      let id = s['id'];
      if (id) {
        this.btnUpdate = true;
        this.service.getById(id).subscribe((res) => {
          this.sucursal = res;
        });
      }
    });
  }

  update() {
    this.sucursal = {
      cod_sucursal: this.form.value.cod_sucursal,
      nombre: this.form.value.nombre,
    };

    this.service.update(this.sucursal).subscribe(
      (res) => {
        this.router.navigate(['/sucursal']);

        this.snackBar.open('La sucursal fue actualizada con éxito', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      },
      (err) => {
        this.snackBar.open('ERROR: No se pudo actualizar sucursal', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    );
  }
}
