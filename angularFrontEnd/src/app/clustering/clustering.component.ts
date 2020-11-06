import { Component, OnInit } from '@angular/core';
import { VisualisationService } from '../services/visualisation.service';
import { Chart, ChartDataSets, ChartPoint } from 'chart.js';

export interface AgeMeanClusterInterface {
  cluster: number;
  AverageAge: number;
  Confirmed: number;
  Recovered: number;
  Deaths: number;
}
export interface TestMeanClusterInterface {
  cluster: number;
  totalTests: number;
  Confirmed: number;
  Recovered: number;
  Deaths: number;
}

@Component({
  selector: 'app-clustering',
  templateUrl: './clustering.component.html',
  styleUrls: ['./clustering.component.scss']
})
export class ClusteringComponent implements OnInit {
  public datasetAge:ChartDataSets[] = new Array();
  public datasetTest:ChartDataSets[] = new Array();
  public meanClustersAge:Number[][] = new Array();
  public tableAge:AgeMeanClusterInterface[] = new Array();
  public tableTest:TestMeanClusterInterface[] = new Array();
  public r:number = 10;

  constructor(private service: VisualisationService) { }


  ngOnInit(): void {
      this.ageClusterchart();
      this.testClusterchart();
      this.service.getClusterMeanAge().subscribe(
        data => {
          for(let i=0;i<data['meanClusters'].length;i++){
            this.tableAge.push({
              cluster: i+1,
              AverageAge: data['meanClusters'][i][0],
              Confirmed: data['meanClusters'][i][1],
              Recovered: data['meanClusters'][i][2],
              Deaths: data['meanClusters'][i][3]
            });
          }
          
          console.log(this.tableAge);

        }
      );
      this.service.getClusterMeanTest().subscribe(
        data => {
          for(let i=0;i<data['meanClusters'].length;i++){
            this.tableTest.push({
              cluster: i+1,
              Confirmed: data['meanClusters'][i][0],
              Recovered: data['meanClusters'][i][1],
              Deaths: data['meanClusters'][i][2],
              totalTests: data['meanClusters'][i][3],
            });
          }
          
          console.log(this.tableTest);

        }
      );

    }



ageClusterchart(){
  this.service.getClusterAge().subscribe(
    data => {
      for(let i=0;i<data['x'].length;i++){
        if(data['cluster'][i]==1){
            this.datasetAge.push({
              backgroundColor: 'rgba(255, 0, 0, 0.4)',
              label: 'Cluster 1 : '+data['countries'][i],
              data: [{x: data['x'][i], y: data['y'][i] ,r: this.r}]
            })
            /* console.log("Cluster 1",data['countries'][i]) */
        }
        if(data['cluster'][i]==2){
            this.datasetAge.push({
              backgroundColor: 'rgba(205, 209, 128, 1)',
              label: 'Cluster 2 : '+data['countries'][i],
              data: [{x: data['x'][i], y: data['y'][i] ,r: this.r}]
            })
           /*  console.log("Cluster 2",data['countries'][i]) */
        }
        if(data['cluster'][i]==3){
            this.datasetAge.push({
              backgroundColor: 'rgba(128, 209, 149, 1)',
              label: 'Cluster 3 : '+data['countries'][i],
              data: [{x: data['x'][i], y: data['y'][i] ,r: this.r}]
            })
            /* console.log("Cluster 3",data['countries'][i]) */
        }
        if(data['cluster'][i]==4){
            this.datasetAge.push({
              backgroundColor: 'rgba(103, 79, 191, 1)',
              label: 'Cluster 4 : '+data['countries'][i],
              data: [{x: data['x'][i], y: data['y'][i] ,r: this.r}]
            })
            /* console.log("Cluster 4",data['countries'][i]) */
        }
        if(data['cluster'][i]==5){
            this.datasetAge.push({
              backgroundColor: 'rgba(202, 128, 209, 1)',
              label: 'Cluster 5 : '+data['countries'][i],
              data: [{x: data['x'][i], y: data['y'][i] ,r: this.r}]
            })
           /*  console.log("Cluster 5",data['countries'][i]) */
        }
      
      }
    });
    console.log(this.datasetAge);
 let char = new Chart('bubbleAge', {
    type: 'bubble',
   options:{
    /*  animation:{duration:0}, */
     legend:{display:false},
     scales:{
      xAxes: [{
        ticks: {
          min: 0,
          max: 30,
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 30,
        }
      }]
     }
   },
    data: {
      datasets:[],
    }
  });
  setTimeout(() => {
    char.data.datasets = this.datasetAge;
    char.update();
  }, 2000);
}

testClusterchart(){
  this.service.getClusterTest().subscribe(
    data => {
      for(let i=0;i<data['x'].length;i++){
        if(data['cluster'][i]==1){
            this.datasetTest.push({
              backgroundColor: 'rgba(255, 0, 0, 0.4)',
              label: 'Cluster 1 : '+data['countries'][i],
              data: [{x: data['x'][i], y: data['y'][i] ,r: this.r}]
            })
            /* console.log("Cluster 1",data['countries'][i]) */
        }
        if(data['cluster'][i]==2){
            this.datasetTest.push({
              backgroundColor: 'rgba(205, 209, 128, 1)',
              label: 'Cluster 2 : '+data['countries'][i],
              data: [{x: data['x'][i], y: data['y'][i] ,r: this.r}]
            })
           /*  console.log("Cluster 2",data['countries'][i]) */
        }
        if(data['cluster'][i]==3){
            this.datasetTest.push({
              backgroundColor: 'rgba(128, 209, 149, 1)',
              label: 'Cluster 3 : '+data['countries'][i],
              data: [{x: data['x'][i], y: data['y'][i] ,r: this.r}]
            })
            /* console.log("Cluster 3",data['countries'][i]) */
        }
        if(data['cluster'][i]==4){
            this.datasetTest.push({
              backgroundColor: 'rgba(103, 79, 191, 1)',
              label: 'Cluster 4 : '+data['countries'][i],
              data: [{x: data['x'][i], y: data['y'][i] ,r: this.r}]
            })
            /* console.log("Cluster 4",data['countries'][i]) */
        }

      }
    });
    console.log(this.datasetTest);
    let char = new Chart('bubbleTest', {
       type: 'bubble',
      options:{
       /*  animation:{duration:0}, */
        legend:{display:false},
        scales:{
         xAxes: [{
           ticks: {
             min: 0,
             max: 30,
           }
         }],
         yAxes: [{
           ticks: {
             min: 0,
             max: 30,
           }
         }]
        }
      },
       data: {
         datasets:[],
       }
     });
     setTimeout(() => {
       char.data.datasets = this.datasetTest;
       char.update();
     }, 2000);


}

   
}
