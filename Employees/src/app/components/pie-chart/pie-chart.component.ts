import { Component, Input, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: [ './pie-chart.component.scss' ]
})
export class PieChartComponent {
  
  @Input() data: any;


  public pieChartPlugins = [ DatalabelsPlugin ];

  public pieChartOptions: any['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: function(value: any, context: any) {
          return  Math.round(value) + '%';
        }
      },
    }
  };
}