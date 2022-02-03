import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class RdrAlertaService {

  constructor(public http: HttpClient, public _user: UsuarioService) { }

  baseUrl = URL_SERVICIOS + '/rdr_alerta';

  addAlerta(alerta:any){
    let url = this.baseUrl;
    url += '?token=' + this._user.token;
    return this.http.post(url, alerta);
  }

  vistoAlerta(id:any, alerta:any){
    let url = `${this.baseUrl}/${id}`
    url += '?token=' + this._user.token;
    return this.http.put(url, alerta)
  }

  getAlerta(id:any){
    let url = `${this.baseUrl}/${id}`
    url += '?token=' + this._user.token;
    return this.http.get<any>(url)
  }

  getAlertas(id:any){
    let url = `${this.baseUrl}/radar/${id}`
    url += '?token=' + this._user.token;
    return this.http.get(url).toPromise().then(res => <any[]> res)
  }

  getNoVistos(id:any){
    let url = `${this.baseUrl}/novistos/${id}`
    url += '?token=' + this._user.token;
    return this.http.get(url).toPromise().then(res => <any[]> res)
  }

  getNumNoVistos(id:any){
    let url = `${this.baseUrl}/num/${id}`
    url += '?token=' + this._user.token;
    return this.http.get(url).toPromise().then(res => <any> res)
  }

  getResumen(id:any, cod:any){
    let url = `${this.baseUrl}/resumen/${id}/${cod}`
    url += '?token=' + this._user.token;
    return this.http.get(url).toPromise().then(res => <any> res)
  }
}
