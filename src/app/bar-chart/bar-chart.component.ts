import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { JsonService } from './json.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})

export class BarChartComponent {

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  
  public barChartLabels: Label[] = ['','','',''];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [0,0,0,0], label: 'CANTIDAD'}
     
  ];

  public barChartColors =[ 
    {
      backgroundColor: 
      [
        'rgba(66,134,244,0.7)',
				'rgba(74,135,72,0.7)',
				'rgba(229,89,50,0.7)',
				'rgba(11,23,50,0.7)'
      ],
    },
  ];
  
  public barChartOptions2: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  
  public barChartLabels2: Label[] = ['','',''];
  barChartType2: ChartType = 'bar';
  barChartLegend2 = true;
  barChartPlugins2 = [];

  public barChartData2: ChartDataSets[] = [
    { data: [0,0,0,0], label: 'CANTIDAD FICHAS'}
     
  ];

  public barChartColors2 =[ 
    {
      backgroundColor: 
      [
        'rgba(66,134,244,0.7)',
				'rgba(74,135,72,0.7)',
				'rgba(229,89,50,0.7)',			
				'rgba(11,23,50,0.7)',
				'rgba(106,212,244,0.7)',
				'rgba(174,135,72,0.7)',
				'rgba(29,89,150,0.7)',
				'rgba(117,23,50,0.7)'			
      ],
    },
  ];
  
  constructor(public json: JsonService) {

    this.json.getJson('https://nameless-plains-49486.herokuapp.com/api/charts').subscribe((res: any) => {
    
      this.barChartLabels[0] = 'UNMSM'
      this.barChartLabels[1] = 'MINSA'
      this.barChartLabels[2] = 'ESSALUD'
      this.barChartLabels[3] = 'EPS'
      
      this.barChartData[0].data[0] = res[2].segurosMedicos.UNMSM[0].seguro_UNMSM
      this.barChartData[0].data[1] = res[2].segurosMedicos.MINSA[0].seguro_MINSA
      this.barChartData[0].data[2] = res[2].segurosMedicos.ESSALUD[0].seguro_ESSALUD
      this.barChartData[0].data[3] = res[2].segurosMedicos.EPS[0].seguro_EPS

    for(var i = 0; i < res[0].cantidadFichasxAnio.length; i++){ 
      
      this.barChartLabels2[i] = (res[0].cantidadFichasxAnio[i]._id).toString()
      this.barChartData2[0].data[i] = res[0].cantidadFichasxAnio[i].count
    }
       console.log((JSON.parse(res[1].cantidadTiposSangrexAnio[0].est))[0].count)
    });  
    
    
    
  }
  ngOnInit() {}
}
