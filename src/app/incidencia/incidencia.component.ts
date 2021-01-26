import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceListUsersService } from '../usuarios/lista-usuario/service-list-users.service';


@Component({
  selector: 'app-incidencia',
  templateUrl: './incidencia.component.html',
  styleUrls: ['./incidencia.component.css']
})
export class IncidenciaComponent implements OnInit {

  forma:FormGroup;
  existeFormulario=false;
 
  
  
  
  //activatedRoute: any;
  constructor(private fb:FormBuilder, private activatedRoute : ActivatedRoute,private router:Router, private serviceIncidencia:ServiceListUsersService, private userService: ServiceListUsersService) {
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

  /*incidencia(){
    
    console.log(this.forma.value);
    this.serviceIncidencia.pushIncidencia(this.forma.value).subscribe(
      (data)=>{
        console.log(data);
      })

  }*/


  


}