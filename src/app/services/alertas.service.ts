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
}
