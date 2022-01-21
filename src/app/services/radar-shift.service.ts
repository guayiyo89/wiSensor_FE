import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { UsuarioService } from './usuario.service';
import { Radar_Shift } from '../interfaces/radar_shift.model';

@Injectable({
  providedIn: 'root'
})
export class RadarShiftService {

  constructor(public http: HttpClient, public _user: UsuarioService) { }
  baseUrl = URL_SERVICIOS + '/radar_shift';

  addRadarShift(radarShift: any) {
    let url = this.baseUrl;
    url += '?token=' + this._user.token;
    return this.http.post(url, radarShift);
  }

  deleteRadarShift(id: any, rdr_shift: Radar_Shift) {
    let url = `${this.baseUrl}/del/${id}`;
    url += '?token=' + this._user.token;
    return this.http.put(url, rdr_shift);
  }

  reAsociarRadarShift(id: any, rdr_shift: Radar_Shift) {
    let url = `${this.baseUrl}/recover/${id}`;
    url += '?token=' + this._user.token;
    return this.http.put(url, rdr_shift);
  }

  //exista una relacion entre radar y usuario
  existeRelacion(id_rdr: any, id_usr: any) {
    let url = `${this.baseUrl}/exist/${id_rdr}/${id_usr}`;
    url += '?token=' + this._user.token;
    return this.http.get(url).toPromise().then(res => <any[]> res)
  }

  //list Radares por usuario
  getRadarShifts(id: any) {
    let url = `${this.baseUrl}/list/${id}`;
    url += '?token=' + this._user.token;
    return this.http.get(url).toPromise().then(res => <any[]> res)
  }


}
