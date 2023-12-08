import { Component, OnInit } from '@angular/core';

import {ChartConfiguration,ChartOptions, ChartEvent, ChartType, ChartData} from "chart.js";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  public  lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  }

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'Janvier',
      'Fevrier',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Decembre'
    ],
    datasets: [
      {
        data: [ 0, 200000, 100000, 400000, 200000, 600000, 400000,800000,600000,1000000,800000,1200000 ],
        label: 'Frais de mission',
        fill: false,
        tension: 0.5,
        borderColor: 'blue',
        backgroundColor: 'blue'
      }
    ]
  };

  //Doughnut
  public doughnutChartLabels: string[] = [ 'Mission validée', 'Mission refusée', 'Mission en attente' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 50, 30, 70 ] }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true
  };
  constructor() { }

  ngOnInit(): void {
  }


  chartLabels=["1st", "2nd","3rd"]

}
