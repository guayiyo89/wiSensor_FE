import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { Genpack } from '../interfaces/generador.model';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class GenpackService {

  baseUrl = URL_SERVICIOS + '/genpack';
  baseUrl2 = URL_SERVICIOS

  constructor(public http: HttpClient, public _user: UsuarioService) { }

  getGenpack(id:any){
    let url = `${this.baseUrl}/${id}`;
    url += '?token=' + this._user.token;
    return this.http.get<any>(url)
  }

  getGenpackes(){
    let url = this.baseUrl
    url += '?token=' + this._user.token;
    return this.http.get<any[]>(url)
  }

  addGenpack(genpack: any){
    let url = this.baseUrl
    console.log('SIIIII');
    
    url += '?token=' + this._user.token;
    return this.http.post(url, genpack)
  }

  editGenpack(id: any, generador: Genpack){
    let url = `${this.baseUrl}/${id}`;
    url += '?token=' + this._user.token;
    return this.http.put(url, generador)
  }

  deleteGenpack(id:any){
    let url = `${this.baseUrl}/${id}`;
    url += '?token=' + this._user.token;
    return this.http.delete<any>(url)
  }

  //-------------------------------------------------------------------
  //-------------------------------------------------------------------

  addGenerador(generador: any){
    let url = `${this.baseUrl2}/generador`  
    url += '?token=' + this._user.token;
    return this.http.post(url, generador)
  }

  getGeneradores(id:any){
    let url = `${this.baseUrl2}/genlist/${id}`;
    url += '?token=' + this._user.token;
    return this.http.get<any[]>(url)
  }

  getGenerador(id:any){
    let url = `${this.baseUrl2}/generador/${id}`;
    url += '?token=' + this._user.token;
    return this.http.get<any>(url)
  }

  editGenerador(id:any, generador:any){
    let url = `${this.baseUrl2}/generador/${id}`;
    url += '?token=' + this._user.token;
    return this.http.put(url, generador)
  }

  deleteGenerador(id:any){
    let url = `${this.baseUrl2}/generador/${id}`;
    url += '?token=' + this._user.token;
    return this.http.delete<any>(url)
  }

}
