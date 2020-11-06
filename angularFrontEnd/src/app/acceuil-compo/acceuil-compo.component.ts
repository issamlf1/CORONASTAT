import { Component, OnInit } from '@angular/core';
import {VisualisationService} from "../services/visualisation.service";

@Component({
  selector: 'app-acceuil-compo',
  templateUrl: './acceuil-compo.component.html',
  styleUrls: ['./acceuil-compo.component.scss']
})
export class AcceuilCompoComponent implements OnInit {
  constructor(private service: VisualisationService) {}
  totalCases: string;
  death: string;
  recovered: string;
  regions = [];
  affectedNum = [];
  update : string;
  ngOnInit(): void {
    this.regions = [];
    this.affectedNum = [];
    this.update = '';
    this.service.StatistiqueMonde().subscribe(
      data => {
        console.log(data);
        this.totalCases = data.totalCases;
        this.death = data.death;
        this.recovered = data.recovered;
      }, error => {
        console.log(error); }
    );
    this.service.dataByregion().subscribe(
      data => {


        this.regions = data.regions;
        this.update = data.update;

        for (let i in data.affectedNum) {
          this.affectedNum.push(Number(data.affectedNum[i]));
        }

        this.chartDatasets = [
          { data: this.affectedNum, label: 'Total cases' }
        ];
        this.chartLabels = this.regions;

      }, error => {
        console.log(error); }
    );
    console.log(this.affectedNum[5]);
  }
  public chartType: string = 'bar';
  public chartDatasets: Array<any>;

  public chartLabels: Array<any> ;

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(102, 255, 255, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(119, 72, 44, 0.2)',
        'rgba(255,0,0,0.3)',
        'rgba(77,83,96,0.2)',
        'rgba(0,255,0,0.3)',
        'rgba(102, 102, 51,0.4)',
        'rgba(102, 102, 153,0.6)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(102, 255, 255, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(119, 72, 44, 1)',
        'red',
        'rgba(77,83,96,1)',
        'rgba(0,255,0,1)',
        'rgba(102, 102, 51,1)',
        'rgba(102, 102, 153,1)'
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}
