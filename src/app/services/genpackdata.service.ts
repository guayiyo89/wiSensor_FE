import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class GenpackdataService {

  baseUrl = URL_SERVICIOS;

  constructor(public http: HttpClient) { }

  getDataGP(id:any){
    let url = `${this.baseUrl}/genpack_data/${id}`;
    return this.http.get<any[]>(url)
  }
  
}
