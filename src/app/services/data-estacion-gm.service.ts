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

  getData(id:string){
    let url = `${this.baseUrl}/${id}`;
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

  //Temperature
  getTempYear(fecha:any, codigo:any){
    let url = `${URL_SERVICIOS}/temp_anio/${codigo}/${fecha}`;
    url += '?token=' + this._user.token;
    return this.http.get<any[]>(url)
  }

  getTempdia(fecha:any, codigo:any){
    let url = `${URL_SERVICIOS}/temp_dia/${codigo}/${fecha}`;
    return this.http.get<any[]>(url)
  }

  getTempmes(fecha:any, codigo:any){
    let url = `${URL_SERVICIOS}/temp_mes/${codigo}/${fecha}`;
    url += '?token=' + this._user.token;
    return this.http.get<any[]>(url)
  }

  //Pressure
  getPresYear(fecha:any, codigo: any){
    let url = `${URL_SERVICIOS}/presion_anio/${codigo}/${fecha}`;
    return this.http.get<any[]>(url)
  }

  getPresDia(fecha:any, codigo: any){
    let url = `${URL_SERVICIOS}/presion_dia/${codigo}/${fecha}`;
    return this.http.get<any[]>(url)
  }

  getPresMes(fecha:any, codigo: any){
    let url = `${URL_SERVICIOS}/presion_mes/${codigo}/${fecha}`;
    return this.http.get<any[]>(url)
  }

  //Lluvia
  getLluviaYear(fecha:any, codigo: any){
    let url = `${URL_SERVICIOS}/precipitacion_anio/${codigo}/${fecha}`;
    return this.http.get<any[]>(url)
  }

  getLluviaDia(fecha:any, codigo: any){
    let url = `${URL_SERVICIOS}/precipitacion_dia/${codigo}/${fecha}`;
    return this.http.get<any[]>(url)
  }

  getLluviaMes(fecha:any, codigo: any){
    let url = `${URL_SERVICIOS}/precipitacion_mes/${codigo}/${fecha}`;
    return this.http.get<any[]>(url)
  }

  //Radiacion
  getRadiacionDia(fecha: any, codigo: any){
    let url = `${URL_SERVICIOS}/radiacion_dia/${codigo}/${fecha}`;
    return this.http.get<any[]>(url)
  }

  getRadiacionMes(fecha: any, codigo: any){
    let url = `${URL_SERVICIOS}/radiacion_mes/${codigo}/${fecha}`;
    return this.http.get<any[]>(url)
  }

  getRadiacionAnio(fecha: any, codigo: any){
    let url = `${URL_SERVICIOS}/radiacion_anio/${codigo}/${fecha}`;
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

  // positional data
  getRSdata(codigo:any): Observable<any>{
    let url = `${URL_SERVICIOS}/airmar200rs/${codigo}`;
    url += '?token=' + this._user.token;
    return this.http.get<any[]>(url)
  }

  // wind and pressure data. Maybe this will be deleted
  getSpeedPress(codigo:any): Observable<any>{
    let url = `${URL_SERVICIOS}/wind_press/${codigo}`;
    return this.http.get<any[]>(url)
  }

}
