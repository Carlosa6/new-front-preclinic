import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';

import { CrearUsuarioService } from './service/crear-usuario.service';
import { LoginService } from '../../login/service/login.service';

import Swal from'sweetalert2';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
  providers: [CrearUsuarioService]
})
export class CrearUsuarioComponent implements OnInit {

  titulo = "Crear Usuario";

  forma: FormGroup;
  roles: [];
  existeRol=false


  constructor(private fb: FormBuilder,private service:LoginService, private serviceUser: CrearUsuarioService, private router: Router) {
    this.crearForm();
   }

  ngOnInit(): void {
   this.getRol()
  }

  getRol(){
    this.service.tipoUsuario()
      .subscribe( data => {
        this.roles= data['rols']
      });
      this.existeRol = true
  }
  get codigoNoValido(){
      return this.forma.get('codigo').invalid && this.forma.get('codigo').touched;
  }
  get nombreNoValido(){
    return this.forma.get('nombres').invalid && this.forma.get('nombres').touched;
}

get apellidoNoValido(){
  return this.forma.get('apellidos').invalid && this.forma.get('apellidos').touched;
}

get dniNoValido(){
  return this.forma.get('dni').invalid && this.forma.get('dni').touched;
}

get emailNoValido(){
  return this.forma.get('email').invalid && this.forma.get('email').touched;
}

get passwordNoValido(){
  return this.forma.get('password').invalid && this.forma.get('password').touched;
}
get direccionNoValido(){
  return this.forma.get('direccion').invalid && this.forma.get('direccion').touched;
}
get telefonoNoValido(){
  return this.forma.get('telefono').invalid && this.forma.get('telefono').touched;
}


  

  crearForm(){
    this.forma = this.fb.group({
      codigo: ['', [Validators.required, Validators.minLength(8)]],
      nombres : ['', [Validators.required, Validators.pattern("[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}")]],
      apellidos: ['', [Validators.required,Validators.pattern("[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,64}")]],
      dni: ['', [Validators.required, Validators.minLength(8)]],
      email:['',[Validators.required, Validators.pattern('[0-9a-zA-Z]([-.w]*[0-9a-zA-Z_+])*@unmsm.edu.pe')]],
      password: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.minLength(7)]],
      sexo: ['' ],
      rol: [''],
      

    }

    );

  }




  user(){
    
   
    if(this.forma.invalid){
      Object.values(this.forma.controls).forEach(control =>{
        control.markAsTouched();
      });
      return;
    }
    
     
    Swal.showLoading()
    this.serviceUser.User(this.forma.value).subscribe(   
      (data) => {
        console.log(data)
        Swal.fire({
          icon: 'success',
          title: 'Envio exitoso',
          text: 'Formulario enviado',
          showConfirmButton: true,
        }).then( () => {
          this.router.navigate(["../usuarios"]);
        })
        
        
      },
      (error) => {
        console.log(error)
      }
    )
  }
  redirigir(){
    this.router.navigate(["../usuarios"]);
  }


}
