import { Component, OnInit } from '@angular/core';
import { VisualisationService } from '../services/visualisation.service';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-comparaison',
  templateUrl: './comparaison.component.html',
  styleUrls: ['./comparaison.component.scss']
})
export class ComparaisonComponent implements OnInit {

  public country1 = "Morocco";
  public country2 = "Algeria";
  public formGroup: FormGroup;
  public labels = new Array();
  public chartLabels = this.labels;
  public chartType = 'line';
  public chartLegend = true;
  public chartDataConfirmed;
  public chartDataDeath;
  public chartDataRecovered;
  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  constructor(private formBuilder: FormBuilder,private service:VisualisationService) { 
    for (let i = 0; i < 107; i++) {
      this.labels.push(i+1);
    }
  }

  ngOnInit(): void {
    this.ngForm();
    this.loadDataConfirmed(this.country1,this.country2);
    this.loadDataDeath(this.country1,this.country2);
    this.loadDataRecovered(this.country1,this.country2);
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++",this.chartDataConfirmed[0]);
    
  }
  onSubmit(){
    this.country1 = this.formGroup.value.country1;
    this.country2 = this.formGroup.value.country2;
    this.loadDataConfirmed(this.country1,this.country2);
    this.loadDataDeath(this.country1,this.country2);
    this.loadDataRecovered(this.country1,this.country2);
  }

  ngForm(){
    this.formGroup = this.formBuilder.group({
      country1: ['', Validators.compose([Validators.required, Validators.pattern('^[A-Z]+[a-zA-Z]*')])],
      country2: ['', Validators.compose([Validators.required, Validators.pattern('^[A-Z]+[a-zA-Z]*')])]
    });
  }

  loadDataConfirmed(country1, country2){
    var data1 = new Array();
    var data2 = new Array();


    this.service.getConfirmedCases(country1).subscribe(
      data => {
        for (let i = 0; i < 107; i++) {
            data1.push(data.confirmed[i]);
        }
        console.log("data1",data1);
      });
      this.service.getConfirmedCases(country2).subscribe(
        data => {
          for (let i = 0; i < 107; i++) {
            data2.push(data.confirmed[i]);
        }
        console.log("data2",data2)
        });
        this.chartDataConfirmed = [
          { data: data1, label: 'Confirmed cases of '+this.country1 },
          { data: data2, label: 'Confirmed cases of '+this.country2 }
        ];
  }
  loadDataDeath(country1, country2){
    var data1 = new Array();
    var data2 = new Array();
    this.service.getDeathCases(country1).subscribe(
      data => {
        for (let i = 0; i < 107; i++) {
            data1.push(data.deaths[i]);
        }
        console.log("data1",data1);
      });
      this.service.getDeathCases(country2).subscribe(
        data => {
          for (let i = 0; i < 107; i++) {
            data2.push(data.deaths[i]);
        }
        console.log("data2",data2)
        });
    this.chartDataDeath = [
      { data: data1, label: 'Death cases of '+this.country1 },
      { data: data2, label: 'Death cases of '+this.country2 }
    ];
  }
  loadDataRecovered(country1, country2){
    var data1 = new Array();
    var data2 = new Array();
    this.service.getRecoveredCases(country1).subscribe(
      data => {
        for (let i = 0; i < 107; i++) {
            data1.push(data.recovered[i]);
        }
        console.log("data1",data1);
      });
      this.service.getRecoveredCases(country2).subscribe(
        data => {
          for (let i = 0; i < 107; i++) {
            data2.push(data.recovered[i]);
        }
        console.log("data2",data2)
        });
    this.chartDataRecovered = [
      { data: data1, label: 'Recovered cases of '+this.country1 },
      { data: data2, label: 'Recovered cases of '+this.country2 }
    ];
  }




}
