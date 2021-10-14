import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Usuario } from '../interfaces/usuario.model';
import { URL_SERVICIOS } from '../config/config';
import { User } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: any;
  token: any;

  constructor(public http: HttpClient, public router: Router) { 
    this.loadStorage();
  }

  isLogin(){
    return(this.token.length > 5) ? true: false;
  }

  //funcion recursiva para no perder la info al actualizar
  loadStorage() {
    if (localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  // Guardado en LS
  guardadoLs( id: string, token: string, usuario: Usuario ) {
    
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify( usuario ));

    this.usuario = usuario;
    this.token = token;
  }

  // LOG OUT
  logout() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  login( usuario: Usuario, recordar: boolean = false){
    if (recordar){
      localStorage.setItem('email', usuario.CORREO)
    } else {
      localStorage.removeItem('email')
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(
      map((resp:any) => {
        this.guardadoLs(resp.id, resp.token, resp.usuario);
        console.log(resp.usuario);
        
        return true;
      })
    )
  }

  getUsers(){
    let url = URL_SERVICIOS + '/usuario';
    url += '?token=' + this.token;
    return this.http.get<any[]>(url);
  }

  getUsuarios(){
    let url = URL_SERVICIOS + '/usuario';
    url += '?token=' + this.token;
    return this.http.get(url).toPromise().then(res => <User[]> res)
  }

  getUser(id:any){
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.get<Usuario>(url);
  }

  getToken(){
    return '?token=' + this.token;
  }

  getUserMail(mail:any){
    let url = URL_SERVICIOS + '/usuario/mail/' + mail;
    return this.http.get<Usuario>(url);
  }

  addUser(usuario: Usuario){
    let url = URL_SERVICIOS + '/usuario/';
    url += '?token=' + this.token;
    return this.http.post(url, usuario);
  }

  editUser(id:any, usuario: Usuario){
    let url = URL_SERVICIOS + '/usuario/' + id
    url += '?token=' + this.token;
    return this.http.put(url, usuario);
  }

  deleteUser(id: any){
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.delete<any>(url)
  }

  
}
