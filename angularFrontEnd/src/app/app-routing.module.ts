import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisualisationComponent } from './visualisation/visualisation.component';
import { AnalyseSentimentComponent } from './analyse-sentiment/analyse-sentiment.component';
import { AccueilComponent } from './accueil/accueil.component';
import {AcceuilCompoComponent} from "./acceuil-compo/acceuil-compo.component";
import { ClusteringComponent } from './clustering/clustering.component';


const routes: Routes = [
  {path:"visualisation", component:VisualisationComponent},
  {path:"sentimentAnalytics", component:AnalyseSentimentComponent},
  {path: "clustering", component:ClusteringComponent},
  {path:"", component:AcceuilCompoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
