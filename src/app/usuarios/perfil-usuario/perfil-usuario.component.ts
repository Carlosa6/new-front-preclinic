import { Component, OnInit } from '@angular/core';
import { PerfilUsuarioService} from './service/perfil-usuario.service'
import { LoginService} from './../../login/service/login.service'

import { ActivatedRoute } from '@angular/router';
import { ServiceListUsersService } from '../lista-usuario/service-list-users.service';

import { IncidenciaService } from '../../incidencia/service/incidencia.service';
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

  /* Incidencias*/
  incidencia : any
  existeincidencia = false


  constructor(private service : ServiceListUsersService, 
              private route: ActivatedRoute,
              private perfil : PerfilUsuarioService,
              private login : LoginService, 
              private incidenciaService :IncidenciaService ) { }

  ngOnInit(): void {
    if(this.login.getRol()=="ADMIN"){
      this.isAdmin =true
    }
      
    this.loadData()
    setTimeout( ()=>{this.loadFichaMedicas() }, 1000)
    setTimeout( ()=>{this.loadIncidencias() }, 1000)
    
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
      },
      error =>{
        console.log(error)
      }
    )
    this.existeFichaMedicas=true
  }

  loadIncidencias(){
    this.incidenciaService.getAllIncidencia(this.codigo).subscribe(
      (data) => {
        this.incidencia= data['incidencias'].incidencia

      },
      error =>{
        console.log(error)
      }
    )
    this.existeincidencia=true
  }

  

}
