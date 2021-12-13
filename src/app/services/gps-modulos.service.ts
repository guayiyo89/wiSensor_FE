import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class GpsModulosService {

  constructor(public http: HttpClient, public _user: UsuarioService) { }

  baseUrl = URL_SERVICIOS + '/gps_modulo';

  getGpsModulos(id: any){
    let url = this.baseUrl + '/all/' + id;
    url += '?token=' + this._user.token;
    return this.http.get(url).toPromise().then(res => <any[]> res)
  }

  getGpsModulo(id: any){
    let url = this.baseUrl + '/' + id;
    url += '?token=' + this._user.token;
    return this.http.get(url).toPromise().then(res => <any[]> res)
  }

  addGpsModulo(gps_modulo: any){
    let url = this.baseUrl;
    url += '?token=' + this._user.token;
    return this.http.post(url, gps_modulo)
  }

  updateGpsModulo(gps_modulo: any, id:any){
    let url = this.baseUrl + '/' + id;
    url += '?token=' + this._user.token;
    return this.http.put(url, gps_modulo).toPromise().then(res => <any> res)
  }

  deleteGpsModulo(id: any, gps_modulo: any){
    let url = this.baseUrl + '/' + id;
    url += '?token=' + this._user.token;
    return this.http.put(url, gps_modulo).toPromise().then(res => <any> res)
  }

  getDataGpsModulo(cod: any, orden: any){
    let url = this.baseUrl + '/data/' + cod + '/' + orden;
    url += '?token=' + this._user.token;
    return this.http.get(url).toPromise().then(res => <any> res)
  }
}
