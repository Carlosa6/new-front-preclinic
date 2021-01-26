import { FormatWidth } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { Json2Service } from './json2.service';
import { IColumnExportingEventArgs, IgxExcelExporterOptions, IgxExcelExporterService } from 'igniteui-angular';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

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
  public pieChartData: SingleDataSet = [0,0,0,0,0,0,0,0];
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

  public miData : any;
  public miData2 : any;

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

  
  constructor(public json: Json2Service, public json2: Json2Service, private excelExportService: IgxExcelExporterService) {

    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    
    //['A+','B+','O+','AB+','A-','B-','O-','AB-']
    
    this.json.getJson('https://nameless-plains-49486.herokuapp.com/api/charts/cir_seguro').subscribe((res: any) => {
 
    this.pieChartLabels2[0] = 'Con 0 '+'['+res["0"]+']'     
    this.pieChartLabels2[1] = 'Con 1 '+'['+res["1"]+']'  
    this.pieChartLabels2[2] = 'Con más de 1 '+'['+res["Mas de 1"]+']'  

    this.pieChartData2[0] = res["0"]
    this.pieChartData2[1] = res["1"]
    this.pieChartData2[2] = res["Mas de 1"]

    this.miData2 = [
      { NumeroDeSeguros: "Con 0", CantidadUsuarios: this.pieChartData2[0] },
      { NumeroDeSeguros: "Con 1", CantidadUsuarios: this.pieChartData2[1] }, 
      { NumeroDeSeguros: "Con más de 1", CantidadUsuarios: this.pieChartData2[2] }
      ];
    
    console.log(res)
    console.log(res["0"])
    console.log(res["1"])
    console.log(res["Mas de 1"])
    });  

    this.json.getJson('https://nameless-plains-49486.herokuapp.com/api/charts/cir_sangre').subscribe((res2: any) => {
      
    console.log(res2)
    console.log(res2["A+"])
    
    this.pieChartLabels[0]= 'A+ '+'['+res2["A+"]+']'
    this.pieChartLabels[1]= 'B+ '+'['+res2["B+"]+']' 
    this.pieChartLabels[2]= 'O+ '+'['+res2["O+"]+']'
    this.pieChartLabels[3]= 'AB+ '+'['+res2["AB+"]+']'
    this.pieChartLabels[4]= 'A- '+'['+res2["A-"]+']'
    this.pieChartLabels[5]= 'B- '+'['+res2["B-"]+']'
    this.pieChartLabels[6]= 'O- '+'['+res2["O-"]+']'
    this.pieChartLabels[7]= 'AB- '+'['+res2["AB-"]+']'

    this.pieChartData[0] = res2["A+"]
    this.pieChartData[1] = res2["B+"]
    this.pieChartData[2] = res2["O+"]
    this.pieChartData[3] = res2["AB+"]
    this.pieChartData[4] = res2["A-"]
    this.pieChartData[5] = res2["B-"]
    this.pieChartData[6] = res2["O-"]
    this.pieChartData[7] = res2["AB-"]
    
    this.miData = [
    { TipoSangre: "A+", Cantidad: this.pieChartData[0] },
    { TipoSangre: "B+", Cantidad: this.pieChartData[1] }, 
    { TipoSangre: "O+", Cantidad: this.pieChartData[2] },
    { TipoSangre: "AB+", Cantidad: this.pieChartData[3] },
    { TipoSangre: "A-", Cantidad: this.pieChartData[4] },
    { TipoSangre: "B-", Cantidad: this.pieChartData[5] },
    { TipoSangre: "O-", Cantidad: this.pieChartData[6] },
    { TipoSangre: "AB-", Cantidad: this.pieChartData[7] }
    ];

    }); 

    
  }

  public generarPDF(){

  var data = document.getElementById('micanvas');
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
    pdf.save('UsuariosTipoDeSangre.pdf'); // Generar PDF
    });
  }
  
  public generarExcel() {
    
      this.excelExportService.exportData(this.miData, new IgxExcelExporterOptions("UsuariosTipoDeSangre"));
  }

  generarJPEG() {
    
    var data = document.getElementById('micanvas');

    html2canvas(data).then(canvas => {
      // Opciones de configuración de imagen
      var link = document.createElement("a");
      document.body.appendChild(link);
      link.download = "UsuariosTipoSangre.jpeg";
      link.href = canvas.toDataURL("image/jpeg");
      link.target = '_blank';
      link.click();
    });
  }

  public generarPDF2(){

    var data = document.getElementById('micanvas2');
    html2canvas(data).then(canvas => {
    
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
   
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); 
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('UsuariosConSeguro.pdf'); 
      });
  }
    
    public generarExcel2() {
      
        this.excelExportService.exportData(this.miData2, new IgxExcelExporterOptions("UsuariosConSeguro"));
    }

    generarJPEG2() {
    
      var data = document.getElementById('micanvas2');
  
      html2canvas(data).then(canvas => {
        // Opciones de configuración de imagen
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.download = "UsuarioConSeguro.jpeg";
        link.href = canvas.toDataURL("image/jpeg");
        link.target = '_blank';
        link.click();
      });
    }

  ngOnInit() {
   
  

  }
}
