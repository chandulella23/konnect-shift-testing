import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from './../environments/environment'
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ApiService } from './services/api-service';
import { BaseService } from './services/base-service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import {AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.MAP_API
    }),
  ],
  providers: [ApiService, BaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
