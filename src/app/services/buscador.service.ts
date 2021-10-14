import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  baseUrl = URL_SERVICIOS

  constructor(public _user: UsuarioService, public http: HttpClient) { }

  getCentros(id: any, palabra: any){
    let url = `${this.baseUrl}/centro/buscar/${id}/${palabra}`;
    url += '?token=' + this._user.token;
    return this.http.get<any[]>(url)
  }

  getUsers(id: any, palabra: any){
    let url = `${this.baseUrl}/usuario/buscar/${id}/${palabra}`;
    url += '?token=' + this._user.token;
    return this.http.get<any[]>(url)
  }

  getEstaciones(id: any, palabra: any){
    let url = `${this.baseUrl}/estacion/buscar/${id}/${palabra}`;
    url += '?token=' + this._user.token;
    return this.http.get<any[]>(url)
  }
}
