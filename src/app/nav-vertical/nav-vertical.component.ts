import { Component, OnInit } from '@angular/core';
import {LoginService} from './../login/service/login.service'
import { Router } from '@angular/router';
import Swal from'sweetalert2';
@Component({
  selector: 'app-nav-vertical',
  templateUrl: './nav-vertical.component.html',
  styleUrls: ['./nav-vertical.component.css']
})
export class NavVerticalComponent implements OnInit {

  IsAdmin = false
  IsUser = false
  dni
  rol
  constructor(private service : LoginService,private router: Router) { }

  ngOnInit(): void {
    this.GetRolUser()
    this.getUserDni()
    this.rol = this.service.getRol()
  }

  GetRolUser(){
    let rol = this.service.getRol();
    if(rol === "ADMIN"){
      this.IsAdmin = true
    }

    else{
      this.IsUser = true
    }

  }
  getUserDni(){
    this.dni = this.service.getUserDni();

  }
  Logout(){
    Swal.fire({
      icon: 'question',
      title: '¿Estas seguro de salir?',
      showConfirmButton: true,
      showCancelButton: true,
    }).then(resp => {
      if(resp.value){
        this.service.removeToken();
        this.service.removeDni();
        this.service.removeRol()
      this.router.navigate(['../login']);;
      }

    })
    
  }


}
