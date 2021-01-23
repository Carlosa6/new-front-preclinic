import { FormatWidth } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { Json2Service } from './json2.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: [ './pie-chart.component.css' ]
})
export class PieChartComponent  {
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['','','','','','','',''];
  public pieChartData: SingleDataSet = [0, 0, 0, 0, 0, 0, 0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors =[ 
    {
      backgroundColor: 
      [
        'rgb(51,255,51,0.7)',
        'rgb(66,134,244,0.7)',
        'rgb(236,255,49,0.7)',
        'rgb(224,0,255,0.7)',
        'rgb(18,142,18,0.7)',
        'rgb(33,20,185,0.7)',
        'rgb(255,216,0,0.7)',
        'rgba(97,18,142,0.7)'
      ],
    },
  ];

  public pieChartOptions2: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels2: Label[] = ['','',''];
  public pieChartData2: SingleDataSet = [0, 0, 0];
  public pieChartType2: ChartType = 'pie';
  public pieChartLegend2 = true;
  public pieChartPlugins2 = [];
  public pieChartColors2 =[ 
    {
      backgroundColor: 
      [
        'rgba(255, 60, 51, 0.7)',
        'rgb(255, 249, 51, 0.7)',
        'rgb(116, 255, 51, 0.7)'
      ],
    },
  ];
  
  constructor(public json: Json2Service, public json2: Json2Service) {

    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    
    //['A+','B+','O+','AB+','A-','B-','O-','AB-']
    
    this.json.getJson('https://nameless-plains-49486.herokuapp.com/api/charts/cir_seguro').subscribe((res: any) => {
 
    this.pieChartLabels2[0] = '0'     
    this.pieChartLabels2[1] = '1'  
    this.pieChartLabels2[2] = 'Más de 1'  

    this.pieChartData2[0] = res["0"]
    this.pieChartData2[1] = res["1"]
    this.pieChartData2[2] = res["Mas de 1"]
    
    console.log(res)
    console.log(res["0"])
    console.log(res["1"])
    console.log(res["Mas de 1"])
    });  

    this.json.getJson('https://nameless-plains-49486.herokuapp.com/api/charts/cir_sangre').subscribe((res2: any) => {
      
    console.log(res2)
    console.log(res2["A+"])
    
    this.pieChartLabels[0]= 'A+'
    this.pieChartLabels[1]= 'B+'
    this.pieChartLabels[2]= 'O+'
    this.pieChartLabels[3]= 'AB+'
    this.pieChartLabels[4]= 'A-'
    this.pieChartLabels[5]= 'B-'
    this.pieChartLabels[6]= 'O-'
    this.pieChartLabels[7]= 'AB-'

    this.pieChartData[0] = res2["A+"]
    this.pieChartData[1] = res2["B+"]
    this.pieChartData[2] = res2["O+"]
    this.pieChartData[3] = res2["AB+"]
    this.pieChartData[4] = res2["A-"]
    this.pieChartData[5] = res2["B-"]
    this.pieChartData[6] = res2["O-"]
    this.pieChartData[7] = res2["AB-"]


    }); 
  }

  ngOnInit() {
  }
}
