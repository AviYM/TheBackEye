import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainModule } from './main/main/main.module';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main/main.component';
import { WelcomeComponent } from './main/welcome/welcome.component';
import { ChartMeasurementComponent } from './dashboard/chart-measurement/chart-measurement.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WelcomeComponent,
    ChartMeasurementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainModule,
    RouterModule.forRoot([
      {
        path: '',
        component: MainComponent,
        children: [
          { path: '', component: WelcomeComponent },
          { path: 'lesson/:id', component: DashboardComponent },
        ],
      },
      // { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
