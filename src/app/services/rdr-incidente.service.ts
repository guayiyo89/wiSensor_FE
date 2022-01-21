import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class RdrIncidenteService {

  constructor(public http: HttpClient, public _user: UsuarioService) { }

  baseUrl = URL_SERVICIOS + '/rdr_incidente';

  addIncidente(incidente:any){
    let url = this.baseUrl;
    url += '?token=' + this._user.token;
    return this.http.post(url, incidente);
  }

  editIncidente(id:any, incidente:any){
    let url = `${this.baseUrl}/${id}`
    url += '?token=' + this._user.token;
    return this.http.put(url, incidente)
  }

  deleteIncidente(id:any, incidente:any){
    let url = `${this.baseUrl}/delete/${id}`
    url += '?token=' + this._user.token;
    return this.http.put(url, incidente)
  }

  getIncidente(id:any){
    let url = `${this.baseUrl}/${id}`
    url += '?token=' + this._user.token;
    return this.http.get(url)
  }

  getIncidentes(id:any){
    let url = `${this.baseUrl}/radar/${id}`
    url += '?token=' + this._user.token;
    return this.http.get(url).toPromise().then(res => <any[]> res)
  }

  getIncidentesByEmpresa(id:any){
    let url = `${this.baseUrl}/empresa/${id}`
    url += '?token=' + this._user.token;
    return this.http.get(url).toPromise().then(res => <any[]> res)
  }
}
