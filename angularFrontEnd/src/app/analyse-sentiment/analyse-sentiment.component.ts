import { Component, OnInit } from '@angular/core';
import {VisualisationService} from "../services/visualisation.service";

@Component({
  selector: 'app-analyse-sentiment',
  templateUrl: './analyse-sentiment.component.html',
  styleUrls: ['./analyse-sentiment.component.scss']
})
export class AnalyseSentimentComponent implements OnInit {

  constructor(private service: VisualisationService) { }
  tweet = [];
  tweet1 = [];
  tweet2 = [];
  tweet3 = [];
  public chartType: string = 'pie';
  public chartDatasets: Array<any> = [{data: []}];
  public chartDatasets1: Array<any> = [{data: []}];
  public chartDatasets2: Array<any> = [{data: []}];
  public chartDatasets3: Array<any> = [{data: []}];
  public chartLabels: Array<any> ;
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
  ngOnInit(): void {
    this.tweet = [];
    this.tweet1 = [];
    this.tweet2 = [];
    this.tweet3 = [];

    this.service.analyseSentimentNature().subscribe(
      data => {
        this.tweet.push(data.negative);
        this.tweet.push(data.positive);
        this.tweet.push(data.neutral);
        this.chartDatasets = [{ data: this.tweet, label: 'My First dataset' }];
      }, error => {
        console.log(error); }
    );
    this.service.analyseSentimentEconomy().subscribe(
      data => {
        this.tweet1.push(data.negative);
        this.tweet1.push(data.positive);
        this.tweet1.push(data.neutral);
        this.chartDatasets1 = [{ data: this.tweet1, label: 'My First dataset' }];
      }, error => {
        console.log(error); }
    );
    this.service.analyseSentimentMentalhealth().subscribe(
      data => {
        this.tweet2.push(data.negative);
        this.tweet2.push(data.positive);
        this.tweet2.push(data.neutral);
        this.chartDatasets2 = [{ data: this.tweet2, label: 'My First dataset' }];
      }, error => {
        console.log(error); }
    );
    this.service.analyseSentimentPolitics().subscribe(
      data => {
        this.tweet3.push(data.negative);
        this.tweet3.push(data.positive);
        this.tweet3.push(data.neutral);
        this.chartDatasets3 = [{ data: this.tweet3, label: 'My First dataset' }];
      }, error => {
        console.log(error); }
    );
    this.chartLabels = ['negative', 'positive', 'neutral'];
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}
