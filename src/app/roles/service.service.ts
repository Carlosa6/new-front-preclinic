import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import {LoginService} from './../login/service/login.service'
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  httpOptions : any
  token
  constructor(private httpCliente: HttpClient, private service :LoginService) {
    this.token = this.service.getToken()
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'access-token': this.token
      })
    };
   }

   getRoles(){
    return this.httpCliente.get('https://nameless-plains-49486.herokuapp.com/api/rol',this.httpOptions)
   }
   postRoles(valor, valor1){
    return this.httpCliente.post('https://nameless-plains-49486.herokuapp.com/api/rol',{"name":valor,"description":valor1},this.httpOptions)
   }
   deleteRoles(valor){
    return this.httpCliente.delete('https://nameless-plains-49486.herokuapp.com/api/rol/'+valor,this.httpOptions)
   }




   getPermisos(){
    return this.httpCliente.post('https://nameless-plains-49486.herokuapp.com/api/perimisos',this.httpOptions)
   }
   getDiscapacidades(){
    return this.httpCliente.get('https://nameless-plains-49486.herokuapp.com/api/discapacidad',this.httpOptions)
   }
   getxIdDiscapacidades(valor){
    return this.httpCliente.get('https://nameless-plains-49486.herokuapp.com/api/discapacidad/'+valor,this.httpOptions)
   }
   EditDiscapacidades(id,valor){
    return this.httpCliente.put('https://nameless-plains-49486.herokuapp.com/api/discapacidad/'+id,{"_id":id,"name":valor},this.httpOptions)
   }
   postDiscapacidad(valor){
    return this.httpCliente.post('https://nameless-plains-49486.herokuapp.com/api/discapacidad',{"name":valor},this.httpOptions)
   }
   deleteDiscapacidad(valor){
    return this.httpCliente.delete('https://nameless-plains-49486.herokuapp.com/api/discapacidad/'+valor,this.httpOptions)
   }



}

