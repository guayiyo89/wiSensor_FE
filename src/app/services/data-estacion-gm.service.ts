import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from '../config/config';
import { Data_estacion_gm } from '../interfaces/data_estacion_gm.model';
import { UsuarioService } from './usuario.service';


@Injectable({
  providedIn: 'root'
})
export class DataEstacionGmService {

  constructor(public http: HttpClient, public _user: UsuarioService) { }

  baseUrl = URL_SERVICIOS + '/data_est_gm';

  getData(id:string, limit: number){
    let url = `${this.baseUrl}/${id}/${limit}`;
    url += '?token=' + this._user.token;
    return this.http.get<Data_estacion_gm[]>(url)
  }

  getLast(id:any){
    let url = `${this.baseUrl}_last/${id}`;
    return this.http.get<Data_estacion_gm>(url)
  }
  //====================================================================

  //get historical data from SP

  getWeatherYear(fecha:any, codigo:any){
    let url = `${URL_SERVICIOS}/weather_year/${codigo}/${fecha}`;
    return this.http.get<any[]>(url)
  }

  getWeatherDay(fecha:any, codigo:any){
    let url = `${URL_SERVICIOS}/weather_day/${codigo}/${fecha}`;
    return this.http.get<any[]>(url)
  }

  getWeatherMonth(fecha:any, codigo:any){
    let url = `${URL_SERVICIOS}/weather_month/${codigo}/${fecha}`;
    return this.http.get<any[]>(url)
  }


  //=============================================================================================================

  getWinds(codigo:any, fecha:string){
    let url = `${URL_SERVICIOS}/wind_rose/${codigo}/${fecha}`;
    //url += '?token=' + this._user.token;
    return this.http.get<any[]>(url)
  }

  getClima(codigo:any, fecha:string): Observable<any>{
    let url = `${URL_SERVICIOS}/weather/${codigo}/${fecha}`;
    return this.http.get<any[]>(url)
  }

  //fakeData for test
  getFakeData(): Observable<any>{
    let url = `${URL_SERVICIOS}/fakeData`
    return this.http.get<any[]>(url)
  }

  //-------------------------------------------------------------------------------------

  // positional data
  getRSdata(codigo:any): Observable<any>{
    let url = `${URL_SERVICIOS}/airmar200rs/${codigo}`;
    url += '?token=' + this._user.token;
    return this.http.get<any[]>(url)
  }

  getRSlimit(codigo:any, limit:number){
    let url = `${URL_SERVICIOS}/airmar200rs/${codigo}/${limit}`;
    url += '?token=' + this._user.token;
    return this.http.get<any[]>(url)
  }

  // wind and pressure data. Maybe this will be deleted
  getSpeedPress(codigo:any): Observable<any>{
    let url = `${URL_SERVICIOS}/wind_press/${codigo}`;
    return this.http.get<any[]>(url)
  }

  getRSmaxMin(codigo:any, fecha:any): Observable<any>{
    let url = `${URL_SERVICIOS}/airmar200rs_maxmin/${codigo}/${fecha}`;
    return this.http.get<any[]>(url)
  }

}
