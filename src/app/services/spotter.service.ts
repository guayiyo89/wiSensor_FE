import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class SpotterService {

  constructor(public http: HttpClient) { }

  baseUrl = URL_SERVICIOS;

  getHeaders(zona: any){
    let url = `${this.baseUrl}/spotter_header/${zona}`
    return this.http.get(url).toPromise().then(res => res as any[]);
  }

  getLastTime(zona: any){
    let url = `${this.baseUrl}/spotter_last/${zona}`
    return this.http.get(url).toPromise().then(res => res as any[]);
  }

  getDetail(id: any){
    let url = `${this.baseUrl}/spotter_d/${id}`
    return this.http.get<any>(url)
  }

  getMarkers(zona: any){
    let url = `${this.baseUrl}/spotter_marker/${zona}`
    return this.http.get(url).toPromise().then(res => res as any[]);
  }

  getMarkersHist(zona: any, fecha1: any){
    let url = `${this.baseUrl}/spotter_marker_hist/${zona}/${fecha1}`
    return this.http.get(url).toPromise().then(res => res as any[]);
  }

  getTrayectoria(id:any){
    let url = `${this.baseUrl}/trayectoria/${id}`
    return this.http.get<any[]>(url)
  }

  getVisto(id:any, detalle: any){
    let url = `${this.baseUrl}/spotter_d_visto/${id}`
    return this.http.put<any>(url, detalle)
  }
  
  getByHora(zona: any){
    let url = `${this.baseUrl}/spotter_hours/${zona}`
    return this.http.get(url).toPromise().then(res => res as any[]);
  }

  getByHour(serial: any){
    let url = `${this.baseUrl}/spotter_byHour/${serial}`
    return this.http.get(url).toPromise().then(res => res as any[]);
  }

  getByDia(zona: any){
    let url = `${this.baseUrl}/spotter_days/${zona}`
    return this.http.get(url).toPromise().then(res => res as any[]);
  }

  getByDist(zona: any){
    let url = `${this.baseUrl}/spotter_dist/${zona}`
    return this.http.get<any[]>(url)
  }

}
