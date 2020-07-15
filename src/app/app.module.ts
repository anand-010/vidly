import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { NavigationComponent } from './dashboard/navigation/navigation.component';
import { AnalyticsComponent } from './dashboard/analytics/analytics.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { LoginComponent } from './other/login/login.component';
import { InfoComponent } from './other/info/info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    DashboardComponent,
    AppComponent,
    HomeComponent,
    NavigationComponent,
    AnalyticsComponent,
    HeaderComponent,
    LoginComponent,
    InfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
