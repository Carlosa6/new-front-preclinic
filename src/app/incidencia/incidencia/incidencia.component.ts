import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceListUsersService } from '../../usuarios/lista-usuario/service-list-users.service';
import {  IncidenciaService} from '../service/incidencia.service';

import Swal from'sweetalert2';

@Component({
  selector: 'app-incidencia',
  templateUrl: './incidencia.component.html',
  styleUrls: ['./incidencia.component.css']
})
export class IncidenciaComponent implements OnInit {

  forma:FormGroup;
  existeFormulario=false;
 

  constructor(private fb:FormBuilder,
              private activatedRoute : ActivatedRoute,
              private router:Router, 
              private serviceIncidencia:IncidenciaService, 
              private userService: ServiceListUsersService) {

    this.FormIncidencia()
   }

  ngOnInit(): void {
  }


  async FormIncidencia(){
    let dni=this.activatedRoute.snapshot.params['dni'];
    const email = await this.userService.getUser(dni).toPromise()

    this.forma = this.fb.group({
      titulo: [''],
      fecha: [''],
      descripcion: [''],
      accion: [''],
      email : email['user'].email,
    });
    
    this.existeFormulario=true
    
  }

  incidencia(){
    
    console.log(this.forma.value);
      //Swal.showLoading()
      let dni=this.activatedRoute.snapshot.params['dni'];
       this.serviceIncidencia.pushIncidencia(this.forma.value).subscribe(
         (data)=>{
           console.log("enviado bien")
           
           Swal.fire({
            icon: 'success',
            title: 'Envio exitoso',
            text: 'Formulario enviado',
            showConfirmButton: true,
          }).then( () => {
            this.router.navigate(['../perfil-usuario', dni]);
          })
           
         },
         (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Hubo un error :(',
            text: error['error'],
          })
          console.log(error)
         }
       )

  }


  


}