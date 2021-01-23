import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { LoginService } from 'src/app/login/service/login.service';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {

  httpOptions: any;
  token: string;
  constructor(private httpCliente: HttpClient,private login :LoginService) {
    this.token = this.login.getToken();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'access-token': this.token,
      }),
    };
  }

  getAllIncidencia(dniUser ){
    return this.httpCliente.get('https://nameless-plains-49486.herokuapp.com/api/incidencia/user/'+dniUser, this.httpOptions)
  }

  getByIdIncidencia( id){
    return this.httpCliente.get('https://nameless-plains-49486.herokuapp.com/api/incidencia/'+id, this.httpOptions)
  }

  pushIncidencia(forma ){
    return this.httpCliente.post('https://nameless-plains-49486.herokuapp.com/api/incidencia',forma, this.httpOptions)
  }
}
