import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { Centro } from '../interfaces/centro.model';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class CentroService {

  baseUrl = URL_SERVICIOS + '/centro';

  constructor(public http: HttpClient, public _user: UsuarioService) { }

  getCentros(){
    let url = this.baseUrl;
    url += '?token=' + this._user.token;
    return this.http.get(url).toPromise().then(res => <any[]> res)
  }

  getCentro(id:any){
    let url = `${this.baseUrl}/${id}`;
    url += '?token=' + this._user.token;
    return this.http.get<Centro>(url)
  }

  addCentro(centro: Centro){
    let url = this.baseUrl;
    url += '?token=' + this._user.token;
    return this.http.post(url, centro);
  }

  editCentro(id:any,centro: Centro){
    let url = `${this.baseUrl}/${id}`;
    url += '?token=' + this._user.token;
    return this.http.put(url, centro);
  }

  deleteCentro(id:any){
    let url = `${this.baseUrl}/${id}`;
    url += '?token=' + this._user.token;
    return this.http.delete<any>(url)
  }

  getItems(id:any){
    let url = `${this.baseUrl}/items/${id}`;
    return this.http.get<any[]>(url)
  }

}
