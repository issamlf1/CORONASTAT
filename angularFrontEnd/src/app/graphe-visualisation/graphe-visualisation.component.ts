import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Http} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {VisualisationService} from "../services/visualisation.service";

@Component({
  selector: 'app-graphe-visualisation',
  templateUrl: './graphe-visualisation.component.html',
  styleUrls: ['./graphe-visualisation.component.scss']
})
export class GrapheVisualisationComponent implements OnInit {
  public formGroup: FormGroup;
  public lastUpdate = "";
  country = "Morocco";
  totalCases: string;
  death: string;
  recovered: string;
  tablo = [];
  mydata = [];
  mydata1 = [];
  mydata2 = [];
  numbers = [];

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private http: Http, private service: VisualisationService) {
    for(var i=0;i<107;i++){
      this.numbers.push(i);
    }

  }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = this.numbers;
  public barChartType = 'line';
  public barChartLegend = true;
  public barChartData;

  public barChartOptions1 = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels1 = this.numbers;
  public barChartType1 = 'line';
  public barChartLegend1 = true;
  public barChartData1 ;

  public barChartOptions2 = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels2 = this.numbers;
  public barChartType2 = 'line';
  public barChartLegend2 = true;
  public barChartData2 ;
  public chartColors2: Array<any> = [
    {
      backgroundColor: 'rgba(255, 65, 24, .5)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    }
  ];
  public chartColors1: Array<any> = [
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  ngOnInit(): void {
    this.ngForm();
    this.loadData();

  }
  onSubmit(){
    this.country = this.formGroup.value.country;
    this.loadData();
  }

 /*  onSubmit(f: NgForm) {
    this.loadData();
  } */
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }


  public chartType: string = 'pie';

  public chartDatasets: Array<any> ;

  public chartLabels: Array<any> = ['Death', 'Active cases', 'Recovered'];

  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870'],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

  ngForm(){
    this.formGroup = this.formBuilder.group({
      country: ['', Validators.compose([Validators.required, Validators.pattern('^[A-Z]+[a-zA-Z]*')])]
    });
  }

loadData(){
  this.mydata = [];
  this.mydata1 = [];
  this.mydata2 = [];
  this.tablo = [];
  console.log(this.country);
  this.service.getConfirmedCases(this.country).subscribe(
    data => {
      console.log(this.mydata);
      for(var i=0;i<107;i++){
        this.mydata.push(data.confirmed[i]);
      }
      this.barChartData = [
        { data: this.mydata, label: 'Confirmed cases' }
      ];
    }, error => {
      console.log(error); }
  );
  this.service.getRecovered(this.country).subscribe(
    data => {
      console.log(data);
      for(var i=0;i<107;i++){
        this.mydata1.push(data.recovered[i]);
      }
      this.barChartData1 = [
        { data: this.mydata1, label: 'Recovered cases' }
      ];
    }, error => {
      console.log(error); }
  );
  this.service.getDeath(this.country).subscribe(
    data => {
      console.log(data);
      for(var i=0;i<107;i++){
        this.mydata2.push(data.deaths[i]);
      }
      this.barChartData2 = [
        { data: this.mydata2, label: 'Death cases' }
      ];
    }, error => {
      console.log(error); }
  );

  this.service.getStatistique(this.country).subscribe(
    data => {
      console.log(data);
      this.totalCases = data.totalCases;
      this.death = data.death;
      this.recovered = data.recovered;
      this.lastUpdate = data.lastUpdate;
      this.tablo.push(Number(data.death.toString().replace(".","")));
      this.tablo.push(Number(data.totalCases.toString().replace(".",""))-Number(data.death.toString().replace(".",""))-Number(data.recovered.toString().replace(".","")));
      this.tablo.push(Number(data.recovered.toString().replace(".","")));
      console.log(this.tablo);
      this.chartDatasets = [
        { data: this.tablo, label: 'My First dataset' }
      ];
    }, error => {
      console.log(error); }
  );

}
}
