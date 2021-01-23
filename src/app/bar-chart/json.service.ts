import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {LoginService} from './../login/service/login.service'

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  httpOptions : any
  token

  constructor(private http: HttpClient,private service :LoginService) { 
    this.token = this.service.getToken()
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'access-token': this.token
      })
    };
  }

  getJson(url: string){
    return this.http.get(url ,this.httpOptions);
  }
}
