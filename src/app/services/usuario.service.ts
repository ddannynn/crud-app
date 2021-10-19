import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../entities/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url: string = 'http://localhost:8080/api/v1/usuario';

  constructor(private http: HttpClient) {}

  save(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.url, usuario);
  }

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url);
  }

  getById(id: String): Observable<Usuario> {
    return this.http.get<Usuario>(this.url + '/' + id);
  }

  update(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.url, usuario);
  }

  delete(id: String): Observable<Usuario> {
    return this.http.delete<Usuario>(this.url + '/' + id);
  }
}
