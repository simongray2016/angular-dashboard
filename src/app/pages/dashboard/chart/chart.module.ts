import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { CardComponent } from './card/card.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PipeChartComponent } from './pipe-chart/pipe-chart.component';
import { TableComponent } from './table/table.component';
import { FormsModule } from '@angular/forms';
import { PipeGirdChartComponent } from './pipe-gird-chart/pipe-gird-chart.component';



@NgModule({
  declarations: [
    CardComponent,
    LineChartComponent,
    PipeChartComponent,
    TableComponent,
    PipeGirdChartComponent
  ],

  imports: [
    CommonModule,
    NzCardModule,
    NgxChartsModule,
    NzTableModule,
    NzInputModule,
    NzIconModule,
    FormsModule
  ],

  exports: [
    CardComponent,
    LineChartComponent,
    PipeChartComponent,
    TableComponent,
    PipeGirdChartComponent
  ],
})
export class ChartModule { }
