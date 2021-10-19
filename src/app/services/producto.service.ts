import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../entities/producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private url: string = 'http://localhost:8080/api/v1/producto';

  constructor(private http: HttpClient) {}

  save(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.url, producto);
  }

  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  }

  getById(id: String): Observable<Producto> {
    return this.http.get<Producto>(this.url + '/' + id);
  }

  update(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(this.url, producto);
  }

  delete(id: String): Observable<Producto> {
    return this.http.delete<Producto>(this.url + '/' + id);
  }
}
