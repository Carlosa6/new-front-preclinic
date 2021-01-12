import { Component, OnInit } from '@angular/core';
import { ServiceListUsersService} from './../lista-usuario/service-list-users.service'
import { PerfilUsuarioService} from './service/perfil-usuario.service'
import { LoginService} from './../../login/service/login.service'

import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  informacion :any
  existeInformacion = false
  codigo : String
  fichas : any
  rol
  existeFichaMedicas = false
  isAdmin =false

  constructor( private service : ServiceListUsersService, private route: ActivatedRoute,private perfil : PerfilUsuarioService, private login : LoginService ) { }

  ngOnInit(): void {
    if(this.login.getRol()=="ADMIN"){
      this.isAdmin =true
    }
      
    this.loadData()
    setTimeout( ()=>{this.loadFichaMedicas() }, 1000)
    
  }

  loadData(){
    let dni=this.route.snapshot.params['dni'];
    this.service.getUser(dni).subscribe(
      (data) =>{
        this.informacion = data['user']
        console.log( this.informacion)
        this.codigo = data['user'].codigo
      },
      (error) =>{
        console.log(error)
      }
    )
    this.existeInformacion = true
  }

  loadFichaMedicas(){
    this.perfil.getFichaMedicas(this.codigo).subscribe(
      (data) => {
        this.fichas= data['usuario'].fichaMedica
        //console.log(data)
        //console.log(this.fichas)
      },
      error =>{
        console.log(error)
      }
    )
    this.existeFichaMedicas=true
  }

}
