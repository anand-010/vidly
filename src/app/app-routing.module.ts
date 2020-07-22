import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { AnalyticsComponent } from './dashboard/analytics/analytics.component';
import { LoginComponent } from './other/login/login.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { InfoComponent } from './other/info/info.component';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToSendEmail = () => redirectLoggedInTo(['send-email']);

const routes: Routes = [
  { path:"dashboard", 
  component : DashboardComponent,
  canActivate : [AngularFireAuthGuard],
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
  component:LoginComponent,
  data: { authGuardPipe: redirectLoggedInToSendEmail }
},
{
  path: "info",
  component:InfoComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
