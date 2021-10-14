import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { Centro } from '../interfaces/centro.model';
import { Empresa } from '../interfaces/empresa.model';
import { Estacion } from '../interfaces/estacion.model';
import { Usuario } from '../interfaces/usuario.model';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  baseUrl = URL_SERVICIOS + '/empresa';

  constructor(public http: HttpClient, public _user: UsuarioService) { }

  //this brings the name of the companies for add, edit items
  getEmpresas(){
    let url = this.baseUrl;
    url += '?token=' + this._user.token;
    return this.http.get<Empresa[]>(url)
  }

  //list companies for the Empresas view
  getCompanies(){
    let url = this.baseUrl;
    url += '?token=' + this._user.token;
    return this.http.get(url).toPromise().then(res => <Empresa[]> res)
  }

  getEmpresa(id:any){
    let url = `${this.baseUrl}/${id}`;
    url += '?token=' + this._user.token;
    return this.http.get<Empresa>(url)
  }

  addEmpresa(empresa: Empresa){
    let url = this.baseUrl;
    url += '?token=' + this._user.token;
    return this.http.post(url, empresa);
  }

  editEmpresa(id:any, empresa: Empresa){
    let url = `${this.baseUrl}/${id}`;
    url += '?token=' + this._user.token;
    return this.http.put(url, empresa);
  }

  deleteEmpresa(id:any){
    let url = `${this.baseUrl}/${id}`;
    url += '?token=' + this._user.token;
    return this.http.delete<any>(url)
  }

  getEstaciones(id:any){
    let url = `${this.baseUrl}/estaciones/${id}`;
    url += '?token=' + this._user.token;
    return this.http.get(url).toPromise().then(res => <Estacion[]> res)
  }

  getCentros(id:any){
    let url = `${this.baseUrl}/centros/${id}`;
    url += '?token=' + this._user.token;
    return this.http.get<Centro[]>(url)
  }

  getCenters(id:any){
    let url = `${this.baseUrl}/centros/${id}`;
    url += '?token=' + this._user.token;
    return this.http.get(url).toPromise().then(res => <any[]> res)
  }

  getUsuarios(id:any){
    let url = `${this.baseUrl}/usuarios/${id}`;
    url += '?token=' + this._user.token;
    return this.http.get<Usuario[]>(url)
  }

  getUsers(id:any){
    let url = `${this.baseUrl}/usuarios/${id}`;
    url += '?token=' + this._user.token;
    return this.http.get(url).toPromise().then(res => <Usuario[]> res)
  }

  
  
}
