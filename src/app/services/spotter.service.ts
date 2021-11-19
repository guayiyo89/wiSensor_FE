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

  getDetail(id: any){
    let url = `${this.baseUrl}/spotter_d/${id}`
    return this.http.get<any>(url)
  }

  getMarkers(zona: any){
    let url = `${this.baseUrl}/spotter_marker/${zona}`
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

}
