import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SucursalComponent } from './components/sucursal/sucursal.component';
import { SucursalFormComponent } from './components/sucursal-form/sucursal-form.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'sucursal', component: SucursalComponent },
  { path: 'sucursal/form', component: SucursalFormComponent },
  { path: 'sucursal/form/:id', component: SucursalFormComponent },
  { path: 'producto', component: ProductoComponent },
  { path: 'producto/form', component: ProductoFormComponent },
  { path: 'producto/form/:id', component: ProductoFormComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'usuario/form', component: UsuarioFormComponent },
  { path: 'usuario/form/:id', component: UsuarioFormComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
