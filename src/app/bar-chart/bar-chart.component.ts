import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import html2canvas from 'html2canvas';
import { IgxExcelExporterOptions, IgxExcelExporterService } from 'igniteui-angular';
import jspdf from 'jspdf';
import { Label } from 'ng2-charts';
import { JsonService } from './json.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})

export class BarChartComponent {

  public miData : any;
  public miData2 : any;

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
  
  public barChartLabels2: Label[] = ['','','','',''];
  barChartType2: ChartType = 'bar';
  barChartLegend2 = true;
  barChartPlugins2 = [];

  public barChartData2: ChartDataSets[] = [
    { data: [0,0,0,0,0], label: 'CANTIDAD FICHAS'}
     
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
  
  constructor(public json: JsonService, private excelExportService: IgxExcelExporterService) {

    this.json.getJson('https://nameless-plains-49486.herokuapp.com/api/charts').subscribe((res: any) => {
      
      console.log(res)

      this.barChartLabels[0] = 'UNMSM'
      this.barChartLabels[1] = 'MINSA'
      this.barChartLabels[2] = 'ESSALUD'
      this.barChartLabels[3] = 'EPS'
      
      this.barChartData[0].data[0] = res[3].segurosMedicos.UNMSM[0].seguro_UNMSM
      this.barChartData[0].data[1] = res[3].segurosMedicos.MINSA[0].seguro_MINSA
      this.barChartData[0].data[2] = res[3].segurosMedicos.ESSALUD[0].seguro_ESSALUD
      this.barChartData[0].data[3] = res[3].segurosMedicos.EPS[0].seguro_EPS
 
    for(var i = 0; i < res[0].cantidadFichasxAnio.length; i++){ 
      
      this.barChartLabels2[i] = res[0].cantidadFichasxAnio[i]._id
      this.barChartData2[0].data[i] = res[0].cantidadFichasxAnio[i].count
    }

    this.miData = [
      { TipoSeguro: "UNMSM", CantidadUsuarios: this.barChartData[0].data[0] },
      { TipoSeguro: "MINSA", CantidadUsuarios: this.barChartData[0].data[1] }, 
      { TipoSeguro: "ESSALUD", CantidadUsuarios: this.barChartData[0].data[2] },
      { TipoSeguro: "EPS", CantidadUsuarios: this.barChartData[0].data[3] }
      ];

    this.miData2 = [
      { Año: "2020", CantidadFichas: res[0].cantidadFichasxAnio[0].count },
      { Año: "2019", CantidadFichas: res[0].cantidadFichasxAnio[1].count }, 
      { Año: "2018", CantidadFichas: res[0].cantidadFichasxAnio[2].count },
      { Año: "2017", CantidadFichas: res[0].cantidadFichasxAnio[3].count },
      { Año: "2016", CantidadFichas: res[0].cantidadFichasxAnio[4].count }
    ];
    console.log(this.miData)
    });  
  
  }

  public captureScreen(){

    var data = document.getElementById('micanvas1');
    html2canvas(data).then(canvas => {
    // Opciones de configuración de imagen
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
   
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 tamaño del PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('TiposDeSeguro.pdf'); // Generar PDF
      });
    }
    
    public exportButtonHandler() {
      
        this.excelExportService.exportData(this.miData, new IgxExcelExporterOptions("TiposDeSeguro"));
        this.captureScreen();
    }

    public captureScreen2(){

      var data = document.getElementById('micanvas1');
      html2canvas(data).then(canvas => {
      // Opciones de configuración de imagen
        var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
     
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jspdf('p', 'mm', 'a4'); // A4 tamaño del PDF
        var position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        pdf.save('FichasPorAño.pdf'); // Generar PDF
        });
      }
      
      public exportButtonHandler2() {
        
          this.excelExportService.exportData(this.miData2, new IgxExcelExporterOptions("FichasPorAño"));
          this.captureScreen2();
      }

  ngOnInit() {}
}
