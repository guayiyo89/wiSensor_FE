import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class EstructurasService {

  baseUrl = URL_SERVICIOS + '/estructura'

  constructor(public http: HttpClient, public _user: UsuarioService) { }

  getEstructuras(){
    let url = this.baseUrl;
    url += '?token=' + this._user.token;
    return this.http.get(url).toPromise().then(res => <any[]> res)
  }

  getEstructura(id: any){
    let url = `${this.baseUrl}/${id}`;
    url += '?token=' + this._user.token;
    return this.http.get(url).toPromise().then(res => <any> res)
  }

  getEstructurasByEmpresa(id: any){
    let url = `${URL_SERVICIOS}/empresa/estructura/${id}`;
    url += '?token=' + this._user.token;
    return this.http.get(url).toPromise().then(res => <any[]> res)
  }

  addEstructura(estructura: any){
    let url = this.baseUrl;
    url += '?token=' + this._user.token;
    return this.http.post(url, estructura).toPromise().then(res => <any> res)
  }

  updateEstructura(estructura: any, id:any){
    let url = `${this.baseUrl}/${id}`;
    url += '?token=' + this._user.token;
    return this.http.put(url, estructura).toPromise().then(res => <any> res)
  }

  deleteEstructura(id: any, estructura: any){
    let url = `${this.baseUrl}/del/${id}`;
    url += '?token=' + this._user.token;
    return this.http.put(url, estructura).toPromise().then(res => <any> res)
  }
}
