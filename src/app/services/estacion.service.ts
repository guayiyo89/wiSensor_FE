import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { Estacion } from '../interfaces/estacion.model';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class EstacionService {

  baseUrl = URL_SERVICIOS + '/estacion';

  constructor(public http: HttpClient, public _user: UsuarioService) { }

  getEstaciones(){
    let url = this.baseUrl;
    url += '?token=' + this._user.token;
    return this.http.get(url).toPromise().then(res => <any[]> res)
  }

  getEstacion(id:any){
    let url = `${this.baseUrl}/${id}`;
    url += '?token=' + this._user.token;
    return this.http.get<Estacion>(url)
  }

  addEstacion(estacion: Estacion){
    let url = this.baseUrl;
    url += '?token=' + this._user.token;
    return this.http.post(url, estacion);
  }

  editEstacion(id:any, estacion: Estacion){
    let url = `${this.baseUrl}/${id}`;
    url += '?token=' + this._user.token;
    return this.http.put(url, estacion);
  }

  deleteEstacion(id:any){
    let url = `${this.baseUrl}/${id}`;
    url += '?token=' + this._user.token;
    return this.http.delete<any>(url)
  }

  getAlertasbySt(cod:any){
    let url = `${this.baseUrl}/alertas/novistas/${cod}`
    url += '?token=' + this._user.token;
    return this.http.get<any[]>(url)
  }

}
