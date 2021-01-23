import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { LoginService} from './../../../login/service/login.service'
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PerfilUsuarioService {

  httpOptions : any;
  token
  constructor(private service: HttpClient,private Tooken :LoginService) {
    this.token = this.Tooken.getToken()
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'access-token': this.token
      })
    };
  
   }

  getFichaMedicas(codigo:String){
    return this.service.get('https://nameless-plains-49486.herokuapp.com/api/medic/usuario/'+ codigo,this.httpOptions)
  }

  
}

