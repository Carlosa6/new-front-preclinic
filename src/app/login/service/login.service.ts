import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  httpOptions: any;
  token: string;
  constructor(private httpCliente: HttpClient) {
    this.token = this.getToken();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'access-token': this.token,
      }),
    };
  }

  Login(email: String, contraseña: String) {
    return this.httpCliente.post(
      'https://nameless-plains-49486.herokuapp.com/api/auth/signin',
      { email: email, password: contraseña }
    );
  }

  //guardo el token
  setToken(token) {
    localStorage.setItem('accessToken', token);
  }
  //obtengo eltoken, si lo requiero
  getToken() {
    return localStorage.getItem('accessToken');
  }
  removeToken() {
    return localStorage.removeItem('accessToken');
  }

  estaLogeado(): boolean {
    if (this.token == undefined) {
      return false;
    } else {
      return true;
    }
  }

  // guardo, sí es administrador
  setRol(user) {
    localStorage.setItem('rol', user);
  }
  // obtnego,sí es administrador
  getRol() {
    return localStorage.getItem('rol');
  }
  removeRol() {
    return localStorage.removeItem('rol');
  }

  setUserDni(user) {
    localStorage.setItem('dni_user', user);
  }

  getUserDni() {
    return localStorage.getItem('dni_user');
  }

  removeDni() {
    return localStorage.removeItem('dni_user');
  }

  tipoSangre() {
    return this.httpCliente.get(
      'https://nameless-plains-49486.herokuapp.com/api/tipo-sangre',
      this.httpOptions
    );
  }
  tipoSangreEspecifico(id) {
    return this.httpCliente.get(
      'https://nameless-plains-49486.herokuapp.com/api/tipo-sangre/' + id,
      this.httpOptions
    );
  }

  tipoUsuario() {
    return this.httpCliente.get(
      'https://nameless-plains-49486.herokuapp.com/api/rol',
      this.httpOptions
    );
  }
  CheckMinsa(control: FormControl) {
    if (control.value) {
    }
  }
  CheckEsalud(control: FormControl) {
    if (control.value) {
    }
  }
}
