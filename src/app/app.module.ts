import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { NavigationComponent } from './dashboard/navigation/navigation.component';
import { AnalyticsComponent } from './dashboard/analytics/analytics.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { LoginComponent } from './other/login/login.component';
import { InfoComponent } from './other/info/info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from 'src/firebase.cred';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/intercepter';
import { GraphQLModule } from './graphql.module';



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
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    HttpClientModule,
    GraphQLModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
