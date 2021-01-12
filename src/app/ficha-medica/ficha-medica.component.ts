import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { LoginService} from './../login/service/login.service'
import { ServiceListUsersService} from '../usuarios/lista-usuario/service-list-users.service'
import { ActivatedRoute,Router } from '@angular/router'; 

import Swal from'sweetalert2';


@Component({
  selector: 'app-ficha-medica',
  templateUrl: './ficha-medica.component.html',
  styleUrls: ['./ficha-medica.component.css']
})


export class FichaMedicaComponent implements OnInit {

  forma: FormGroup;
  existeFormulario = false
  sangres = [];
  existeSangre = false
  User : any
  anios = [{ 'valor': 2020}, {'valor': 2021}]
  anio: Number


  constructor( private fb: FormBuilder, private service: LoginService, private activatedRoute : ActivatedRoute, private userService :ServiceListUsersService,private router: Router) { 

    this.crearFormulario()
    
  }

  ngOnInit(): void {
    this.getSangre();    
    
  }


  getSangre(){
    this.service.tipoSangre()
      .subscribe( data => {
        this.sangres= data['listado']
        //console.log(this.sangres )
      });
      this.existeSangre = true
  }

  get diagnosticos() {
    return this.forma.get('diagnostico') as FormArray;
  }
  get medicamentoHabituales() {
    return this.forma.get('medicamentoHabitual') as FormArray;
  }

  get MedicamentosAlergicos(){
    return this.forma.get('medicamentosAlergicos') as FormArray
  }



  async crearFormulario() {

    let dni=this.activatedRoute.snapshot.params['dni'];
    const email = await this.userService.getUser(dni).toPromise()

    this.forma = this.fb.group({

      diagnostico: this.fb.array([]),
      medicamentoHabitual: this.fb.array([]),
      medicamentosAlergicos: this.fb.array([]),
      tipoSangre : '',
      seguroMedico: this.fb.group({
        UNMSM : false,
        MINSA : false,
        ESSALUD: false,
        EPS: ''
      }),
      email : email['user'].email,
      anio : '' 


    });
    //console.log(this.forma)
    this.existeFormulario=true

  }

  /*  SEGURO  */
  checkboxMinsa() {
      if(!this.forma.get('seguroMedico').value['MINSA'] == true){
        this.forma.get('seguroMedico').patchValue({'ESSALUD' : false})
      }
    
  }
  checkboxEssalud() {
    if(!this.forma.get('seguroMedico').value['ESSALUD'] == true){
      this.forma.get('seguroMedico').patchValue({'MINSA' : false})
    }
  
}


  agregarMedicamentoAlergico() {
    this.MedicamentosAlergicos.push( this.fb.control(''));
  }
  
  borrarMedicamentoAlergico(i: number) {
    this.MedicamentosAlergicos.removeAt(i);
  }



  agregarDiagnostico() {
    this.diagnosticos.push( this.fb.control(''));
  }
  
  borrarDiagnostico(i: number) {
    this.diagnosticos.removeAt(i);
  }

  agregarMedicamentoHabitual() {
    const medicina = this.fb.group({
      nombre: '',
      dosis: '',
      cantidad: '',
      periodo: ''
    });
    this.medicamentoHabituales.push( medicina);
  }
  
  borrarMedicamentoHabitual(i: number) {
    this.medicamentoHabituales.removeAt(i);
  }


  guardar() {
    if ( this.forma.invalid ) {

      return Object.values( this.forma.controls ).forEach( control => {
        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
        
        
      });
     
    }
    
    Swal.showLoading()
  let dni=this.activatedRoute.snapshot.params['dni'];
   this.userService.pushFichaMedica(this.forma.value).subscribe(
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
  Redirigir(){
    let ficha=this.activatedRoute.snapshot.params['dni'];
    this.router.navigate(['../perfil-usuario',ficha])
  }

}