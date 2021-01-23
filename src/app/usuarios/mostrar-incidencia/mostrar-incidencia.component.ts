import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceListUsersService } from '../lista-usuario/service-list-users.service';

@Component({
  selector: 'app-mostrar-incidencia',
  templateUrl: './mostrar-incidencia.component.html',
  styleUrls: ['./mostrar-incidencia.component.css']
})
export class MostrarIncidenciaComponent implements OnInit {

  titulo
  fecha
  descripcion
  accion

  existeIncidencia= false;

  constructor(private router:Router, private inc:ServiceListUsersService, private route :ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(){
    let incidencia=this.route.snapshot.params['id'];
    const data = await this.inc.getIncidencia(incidencia).toPromise()
    console.log(data)
        console.log(data['incidencia'])
        this.titulo = data['incidencia'].titulo
        this.fecha = data['incidencia'].fecha
        this.descripcion = data['incidencia'].descripcion
        this.accion = data['incidencia'].accion
        

        
            this.existeIncidencia = true
      }
        
      
 
}
