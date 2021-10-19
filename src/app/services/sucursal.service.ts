import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sucursal } from '../entities/sucursal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SucursalService {
  private url: string = 'http://localhost:8080/api/v1/sucursal';

  constructor(private http: HttpClient) {}

  save(sucursal: Sucursal): Observable<Sucursal> {
    return this.http.post<Sucursal>(this.url, sucursal);
  }

  getAll(): Observable<Sucursal[]> {
    return this.http.get<Sucursal[]>(this.url);
  }

  getById(id: String): Observable<Sucursal> {
    return this.http.get<Sucursal>(this.url + '/' + id);
  }

  update(sucursal: Sucursal): Observable<Sucursal> {
    return this.http.put<Sucursal>(this.url, sucursal);
  }

  delete(id: String): Observable<Sucursal> {
    return this.http.delete<Sucursal>(this.url + '/' + id);
  }
}
