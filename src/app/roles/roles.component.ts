import { Component, OnInit } from '@angular/core';
import { ServiceService} from './service.service'
import Swal from'sweetalert2';  
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  DataRoles
  DataRolesListo = false
  DataPermisos

  identificador
  nombre
  descripcion
  constructor(private service : ServiceService ) { }

  ngOnInit(): void {
  this.getDataRoles()
  }



getDataRoles(){

  this.service.getRoles().subscribe(
    (data) => {
      console.log(data)
      this.DataRoles=data['rols']
      this.DataRolesListo = true
    }
  )
  
}
PostRoles(){

  this.service.postRoles(this.nombre,this.descripcion).subscribe(
    (data) => {
      console.log("enviando")
      Swal.fire({
        icon: 'success',
        title: 'Creado con exito',
        showConfirmButton: true,
      })
      this.getDataRoles()
    }
  )

}
DeleteRoles(id){
  console.log(id) //mostrando lo que enviare
  Swal.fire({
    icon: 'question',
    title: '¿Estas seguro de eliminar?',
    showConfirmButton: true,
    showCancelButton: true,
  }).then(resp => {
    if(resp.value){
      this.service.deleteRoles(id).subscribe(
        (data) => {
          console.log("eliminado")
          this.getDataRoles()
        },
        (error) => {
          console.log(error)
        }
      )
    }

  })
  

}

EditarRol(id){
  console.log(id) //mostrando lo que enviare
     this.service.getxIdRol(id).subscribe(
        (data) => {
          this.nombre = data['foundRol'].name
          this.identificador = data['foundRol']._id
          this.descripcion = data['foundRol'].description
          
        },
        (error) => {
          console.log(error)
        }
      )

      
    }
    EditadoRol(){
     this.service.EditRol(this.identificador,this.nombre,this.descripcion).subscribe(
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
