import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ModulosService {

  constructor(public http: HttpClient, public _user: UsuarioService) { }

  baseUrl = URL_SERVICIOS + '/modulo';

  getPonton(id: any){
    let url = this.baseUrl + '/ponton/' + id;
    url += '?token=' + this._user.token;
    return this.http.get(url).toPromise().then(res => <any[]> res)
  }

  getJaulas(id: any){
    let url = this.baseUrl + '/jaulas/' + id;
    url += '?token=' + this._user.token;
    return this.http.get(url).toPromise().then(res => <any[]> res)
  }

  getModulo(id: any){
    let url = `${this.baseUrl}/${id}`;
    url += '?token=' + this._user.token;
    return this.http.get(url).toPromise().then(res => <any> res)
  }

  addModulo(modulo: any){
    let url = this.baseUrl;
    url += '?token=' + this._user.token;
    return this.http.post(url, modulo)
  }

  updateModulo(modulo: any, id:any){
    let url = `${this.baseUrl}/${id}`;
    url += '?token=' + this._user.token;
    return this.http.put(url, modulo)
  }

  deleteModulo(id: any, modulo: any){
    let url = `${this.baseUrl}/del/${id}`;
    url += '?token=' + this._user.token;
    return this.http.put(url, modulo).toPromise().then(res => <any> res)
  }

}
