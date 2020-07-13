import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { AnalyticsComponent } from './dashboard/analytics/analytics.component';
import { LoginComponent } from './other/login/login.component';


const routes: Routes = [
  { path:"dashboard", 
  component : DashboardComponent,
  children :[
    {
      path:"home",
      component:HomeComponent
    },
    {
      path:"analytics",
      component:AnalyticsComponent
    }
  ]
}
,{
  path: "login",
  component:LoginComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
