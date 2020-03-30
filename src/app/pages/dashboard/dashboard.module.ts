import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NzGridModule } from 'ng-zorro-antd/grid'
import { ChartModule } from './chart/chart.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NzGridModule,
    ChartModule
  ]
})
export class DashboardModule { }
