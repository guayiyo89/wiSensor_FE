import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { Incidente } from '../interfaces/incidente.model';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class IncidenteService {

  constructor(public http: HttpClient, public _user: UsuarioService) { }

  baseUrl = URL_SERVICIOS;

  getIncidentesbyEstacion(codigo:any){
    let url = `${this.baseUrl}/estacion/incidentes/${codigo}`
    url += '?token=' + this._user.token;
    return this.http.get<any[]>(url)
  }

  addIncidente(incidente: any){
    let url = `${this.baseUrl}/incidente`
    url += '?token=' + this._user.token;
    return this.http.post(url, incidente)
  }

  editIncidente(id:any, incidente:any){
    let url = `${this.baseUrl}/incidente/${id}`
    url += '?token=' + this._user.token;
    return this.http.put(url, incidente);
  }

  getIncidente(id:any){
    let url = `${this.baseUrl}/incidente/${id}`
    url += '?token=' + this._user.token;
    return this.http.get<any>(url)
  }

}
