import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { FormGroup } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { LoginService} from './../../login/service/login.service'
@Injectable({
  providedIn: 'root'
})
export class ServiceListUsersService {

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

  getUsers(){
    return this.service.get('https://nameless-plains-49486.herokuapp.com/api/users',this.httpOptions)
  }
  getUser(dni: number){
    return this.service.get('https://nameless-plains-49486.herokuapp.com/api/users/' + dni,this.httpOptions)
  }
  pushFichaMedica(forma){
    console.log("estoy enviando")
    
    console.log(forma)
    return this.service.post('https://nameless-plains-49486.herokuapp.com/api/medic',forma,this.httpOptions)
  }
  getFicha(id){
    return this.service.get('https://nameless-plains-49486.herokuapp.com/api/medic/'+ id,this.httpOptions)
  }
}
