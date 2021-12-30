import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiWeatherService {

  constructor(public http: HttpClient) { }
  // get current data
  getData(){
    let url = `http://api.weatherapi.com/v1/current.json?key=6a7eb49c132e4fcbad4155159212109&q=Puerto Montt&aqi=yes&lang=es`
    return this.http.get(url)
  }

  //get data for the next 7 days at the same time (24, 48, 72, ...)
  getData5days(lat: any, lon: any){
    let url = `http://api.weatherapi.com/v1/forecast.json?key=2b9fdbb12a1a4f72989134004210212&q=${lat}, ${lon}&days=5&aqi=no&alerts=no&lang=es&hour=16`
    return this.http.get(url)
  }
}
