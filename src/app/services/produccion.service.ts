import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ProduccionService {

  constructor(public http: HttpClient, public _user: UsuarioService) { }

  baseUrl = URL_SERVICIOS + '/produccion';

  getLdds75(codigo:any){
    let url = `${this.baseUrl}/ldds75/${codigo}`
    url += '?token=' + this._user.token;
    return this.http.get<any[]>(url)
  }

  getLht65Lux(codigo:any){
    let url = `${this.baseUrl}/lht65_lux/${codigo}`
    url += '?token=' + this._user.token;
    return this.http.get<any[]>(url)
  }
}
