import { Component, OnInit } from '@angular/core';
import { ServiceService} from './../roles/service.service'
import {  Router} from '@angular/router';
import Swal from'sweetalert2';  
@Component({
  selector: 'app-discapacidades',
  templateUrl: './discapacidades.component.html',
  styleUrls: ['./discapacidades.component.css']
})
export class DiscapacidadesComponent implements OnInit {

  discapacidad
  DataDiscapacidades
  DataDiscapacidadesListo = false
  DataPermisos

  name
  identificador
  constructor(private service : ServiceService, private router: Router ) { }

  ngOnInit(): void {
    this.getDataDiscapacidades()
  }

  getDataDiscapacidades(){

    this.service.getDiscapacidades().subscribe(
      (data) => {
        console.log(data)
        this.DataDiscapacidades=data['discapacidades']
        this.DataDiscapacidadesListo = true
      }
    )
    
  }
  PostDiscapacidades(){
    console.log(this.discapacidad) //mostrando lo que enviare
    this.service.postDiscapacidad(this.discapacidad).subscribe(
      (data) => {
        console.log("enviando")
        Swal.fire({
          icon: 'success',
          title: 'Creado con exito',
          showConfirmButton: true,
        })
        this.getDataDiscapacidades()
      }
    )

  }
  DeleteDiscapacidades(id){
    console.log(id) //mostrando lo que enviare
    Swal.fire({
      icon: 'question',
      title: '¿Estas seguro de eliminar?',
      showConfirmButton: true,
      showCancelButton: true,
    }).then(resp => {
      if(resp.value){
        this.service.deleteDiscapacidad(id).subscribe(
          (data) => {
            this.getDataDiscapacidades()
          },
          (error) => {
            console.log(error)
          }
        )
      }

    })
    

  }

  EditarDiscapacidades(id){
    console.log(id) //mostrando lo que enviare
       this.service.getxIdDiscapacidades(id).subscribe(
          (data) => {
            this.name = data['foundDiscapacidad'].name
            this.identificador = data['foundDiscapacidad']._id
          },
          (error) => {
            console.log(error)
          }
        )

        
      }
      EditadoDiscapacidades(){
       this.service.EditDiscapacidades(this.identificador,this.name).subscribe(
          (data) => {
            console.log(data)
            window.location.reload();
          },
          (error) => {
            console.log(error)
          }
        )
      }
}
