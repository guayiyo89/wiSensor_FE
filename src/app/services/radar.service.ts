import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { ExcelServiceService } from './excel-service.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class RadarService {

  baseUrl = URL_SERVICIOS + '/radar';
  zonaUrl = URL_SERVICIOS + '/zona';

  constructor(public http: HttpClient, public _user: UsuarioService, private _excel: ExcelServiceService) { }

  getRadar(id:any){
    let url = `${this.baseUrl}/${id}`;
    url += '?token=' + this._user.token;
    return this.http.get<any>(url)
  }

  getRadares(){
    let url = this.baseUrl
    url += '?token=' + this._user.token;
    return this.http.get<any[]>(url)
  }

  addRadar(radar: any){
    let url = this.baseUrl  
    url += '?token=' + this._user.token;
    return this.http.post(url, radar)
  }

  editRadar(id: any, radar: any){
    let url = `${this.baseUrl}/${id}`;
    url += '?token=' + this._user.token;
    return this.http.put(url, radar)
  }

  deleteRadar(id:any, radar: any){
    let url = `${this.baseUrl}/del/${id}`;
    url += '?token=' + this._user.token;
    return this.http.put(url, radar)
  }

  getFlag(id:any){
    let url = `${this.baseUrl}/flag/${id}`;
    url += '?token=' + this._user.token;
    return this.http.get<any>(url)
  }

  getZonas(id:any){
    let url = `${this.zonaUrl}/${id}`;
    url += '?token=' + this._user.token;
    return this.http.get<any[]>(url)
  }

  getByCentro(id:any){
    let url = `${this.baseUrl}/centro/${id}`;
    url += '?token=' + this._user.token;
    return this.http.get<any[]>(url)
  }

  addZona(zona: any){
    let url = this.zonaUrl
    url += '?token=' + this._user.token;
    return this.http.post(url, zona)
  }

  editZona(id: any, zona: any){
    let url = `${this.zonaUrl}/${id}`;
    url += '?token=' + this._user.token;
    return this.http.put(url, zona)
  }

  deleteZona(id:any, zona: any){
    let url = `${this.zonaUrl}/del/${id}`;
    url += '?token=' + this._user.token;
    return this.http.put(url, zona)
  }



}
