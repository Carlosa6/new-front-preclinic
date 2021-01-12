import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {LoginService} from './../service/login.service'

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  
  constructor(private service: LoginService, private router: Router){}

  canActivate(): boolean {

    console.log('guard');
     if(this.service.estaLogeado()){
      console.log('asd');
       return true
     }
     console.log('wweweasd');
       this.router.navigate(['/login']);
       console.log('32434');
       return false
     
   
 }
  
}
