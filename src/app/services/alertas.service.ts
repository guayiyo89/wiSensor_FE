import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { Alerta } from '../interfaces/alerta.model';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(public http: HttpClient, public _user: UsuarioService) { }

  baseUrl = URL_SERVICIOS + '/alerta';

  addAlerta(alerta:Alerta){
    let url = this.baseUrl;
    url += '?token=' + this._user.token;
    return this.http.post(url, alerta);
  }

  vistoAlerta(id:any, alerta:Alerta){
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
    let url = `${this.baseUrl}/centro/${id}`
    url += '?token=' + this._user.token;
    return this.http.get(url).toPromise().then(res => <any[]> res)
  }
}
