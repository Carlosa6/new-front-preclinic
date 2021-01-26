import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IncidenciaService } from '../service/incidencia.service';

@Component({
  selector: 'app-mostrar-incidencia',
  templateUrl: './mostrar-incidencia.component.html',
  styleUrls: ['./mostrar-incidencia.component.css']
})
export class MostrarIncidenciaComponent implements OnInit {

  incidencia
  fecha
  existeIncidencia= false;

  constructor(private router:Router,private incidenciaService:IncidenciaService, private activate :ActivatedRoute) { 
    this.loadData()
  }

  ngOnInit(): void {
  }

  loadData(){
    let id=this.activate.snapshot.params['id'];
    console.log(id)
        this.incidenciaService.getByIdIncidencia(id).subscribe(
          (data) => {
            console.log(data['incidencia'].titulo)
            this.incidencia= data['incidencia']
            
            this.existeIncidencia= true;
            
          }
        )
      
 }
  Redirigir(){
    let ficha=this.activate.snapshot.params['dni'];
    this.router.navigate(['../perfil-usuario',ficha])
  }

  
}
