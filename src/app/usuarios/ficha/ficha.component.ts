import { Component, OnInit   } from '@angular/core';
import { ServiceListUsersService} from './../lista-usuario/service-list-users.service'
import { ActivatedRoute, Router} from '@angular/router';
import {LoginService} from './../../login/service/login.service'
import { FormGroup, FormBuilder} from '@angular/forms';
import Swal from'sweetalert2';  

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {

  forma: FormGroup;
  diagnostico = []
  medicamentosAlergicos = []
  idtipoSangre 
  tipoSangre 
  medicamentoHabitual = []
  Seguros
  anio
  existeFicha = false
  existeFormulario = false


  constructor(private service : ServiceListUsersService, private route: ActivatedRoute, private router: Router, private login:LoginService) { }

  ngOnInit(): void {
    this.loadData()

  }


  async loadData(){
    let ficha=this.route.snapshot.params['id'];
    const data = await this.service.getFicha(ficha).toPromise()
    console.log(data)
        console.log(data['ficha'])
        this.diagnostico = data['ficha'].diagnostico
        this.medicamentosAlergicos = data['ficha'].medicamentosAlergicos
        this.idtipoSangre = data['ficha'].tipoSangre
        this.medicamentoHabitual = data['ficha'].medicamentoHabitual
        this.Seguros = data['ficha'].seguroMedico
        this.anio = data['ficha'].anio

        this.login.tipoSangreEspecifico(this.idtipoSangre).subscribe(
          (data) => {
            console.log(data)
            this.tipoSangre=data['tipo'].representation
            this.existeFicha = true
          }
        )
      
 }



  Redirigir(){
    let dni=this.route.snapshot.params['dni'];
    
    this.router.navigate(['../perfil-usuario',dni])
  }

  Eliminar(){
    let usuario=this.route.snapshot.params['dni'];
    let ficha=this.route.snapshot.params['id'];
    Swal.fire({
      icon: 'question',
      title: '¿Estas seguro de eliminar?',
      showConfirmButton: true,
      showCancelButton: true,
    }).then(resp => {
      if(resp.value){
        this.service.EliminarFicha(usuario,ficha).subscribe(
          data => {
            console.log("eliminado" + data)
            this.router.navigate(['../perfil-usuario',usuario])
          },
          error => {
            console.log(error)
          }
        )
      }

    })
    
    
  }


  
}
